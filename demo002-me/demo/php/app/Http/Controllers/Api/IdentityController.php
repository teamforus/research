<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\IdentityAuthorizationEmailTokenRequest;
use App\Http\Requests\Api\IdentityStoreRequest;
use App\Http\Requests\Api\IdentityUpdatePinCodeRequest;
use App\Models\Source;
use App\Http\Controllers\Controller;
use App\Services\Forus\Identity\Models\Identity;
use App\Services\Forus\Identity\Models\IdentityProxy;
use Illuminate\Http\Request;

class IdentityController extends Controller
{
    protected $mailerService;
    protected $identityRepo;
    protected $recordRepo;

    public function __construct() {
        $this->mailerService = app()->make('forus.services.mailer');
        $this->identityRepo = app()->make('forus.services.identity');
        $this->recordRepo = app()->make('forus.services.record');
    }

    public function index(Request $request)
    {
        $identity = Identity::getModel()->find($request->get('identity'));

        return collect($identity)->only([
            'address',
            'stem_points'
        ]);
    }

    /**
     * Create new identity
     *
     * @param IdentityStoreRequest $request
     * @return array
     * @throws \Exception
     */
    public function store(IdentityStoreRequest $request)
    {
        $identityId = $this->identityRepo->make(
            $request->input('type'),
            $request->input('pin_code'),
            $request->input('records')
        );

        $identityProxyId = $this->identityRepo->makeIdentityPoxy($identityId);

        return [
            'access_token' => $this->identityRepo->getProxyAccessToken(
                $identityProxyId
            )
        ];
    }

    /**
     * @param IdentityUpdatePinCodeRequest $request
     * @return array
     * @throws \Exception
     */
    public function updatePinCode(IdentityUpdatePinCodeRequest $request)
    {
        $success = $this->identityRepo->updatePinCode(
            $request->get('proxyIdentity'),
            $request->input('pin_code'),
            $request->input('old_pin_code')
        );

        return compact('success');
    }

    /**
     * @param Request $request
     * @param string $pinCode
     * @return array
     * @throws \Exception
     */
    public function checkPinCode(Request $request, string $pinCode)
    {
        $success = $this->identityRepo->cmpPinCode(
            $request->get('proxyIdentity'),
            $pinCode
        );

        return compact('success');
    }

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws \Exception
     */
    public function proxyDestroy(Request $request) {
        $proxyDestroy = $request->get('proxyIdentity');

        $this->identityRepo->destroyProxyIdentity($proxyDestroy);

        return response()->json([], 200);
    }

    /**
     * Make new code authorization proxy identity
     * @return array
     */
    public function proxyAuthorizationCode() {
        return $this->identityRepo->makeAuthorizationCodeProxy();
    }

    /**
     * Make new token authorization proxy identity
     * @return array
     */
    public function proxyAuthorizationToken() {
        return $this->identityRepo->makeAuthorizationTokenProxy();
    }

    /**
     * Make new email authorization proxy identity
     * @param IdentityAuthorizationEmailTokenRequest $request
     * @return array
     */
    public function proxyAuthorizationEmailToken(
        IdentityAuthorizationEmailTokenRequest $request
    ) {
        $email = $request->input('email');
        $source = $request->input('source');

        $identityId = $this->recordRepo->identityIdByEmail($email);
        $proxy = $this->identityRepo->makeAuthorizationEmailProxy($identityId);

        if (!empty($proxy)) {
            $view = 'emails.identity.authorize-email_token';

            $this->mailerService->push($view, [
                'email_token'   => $proxy['auth_email_token'],
                'source'        => $source
            ], [
                'to'            => $email,
                'subject'       => trans(
                    'identity-proxy.restore_email_subject'
                )
            ]);
        }

        return [
            'success' => !empty($proxy),
            'access_token' => !empty($proxy) ? $proxy['access_token'] : null
        ];
    }

    /**
     * Authorize code
     * @param Request $request
     * @return array|
     */
    public function proxyAuthorizeCode(Request $request) {
        $status = $this->identityRepo->activateAuthorizationCodeProxy(
            $request->get('identity'),
            $request->post('auth_code', '')
        );

        if ($status === "not-found") {
            return abort(404, trans(
                'identity-proxy.code.' . $status
            ));
        } elseif ($status === "not-pending") {
            return abort(402, trans(
                'identity-proxy.code.' . $status
            ));
        } elseif ($status === "expired") {
            return abort(402, trans(
                'identity-proxy.code.' . $status
            ));
        } elseif ($status === true) {
            return [
                'success' => true
            ];
        }

        return [
            'success' => false
        ];
    }

    /**
     * Authorize token
     * @param Request $request
     * @return array|
     */
    public function proxyAuthorizeToken(Request $request) {
        $status = $this->identityRepo->activateAuthorizationTokenProxy(
            $request->get('identity'),
            $request->post('auth_token', '')
        );

        if ($status === "not-found") {
            return abort(404, trans(
                'identity-proxy.code.' . $status
            ));
        } elseif ($status === "not-pending") {
            return abort(402, trans(
                'identity-proxy.code.' . $status
            ));
        } elseif ($status === "expired") {
            return abort(402, trans(
                'identity-proxy.code.' . $status
            ));
        } elseif ($status === true) {
            return [
                'success' => true
            ];
        }

        return [
            'success' => false
        ];
    }

    /**
     * Authorize email token
     * @param Request $request
     * @param string $source
     * @param string $emailToken
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|string|array
     */
    public function proxyAuthorizeEmail(
        Request $request,
        string $source,
        string $emailToken
    ) {
        if ($request->headers->get('Accept') != 'application/json') {
            if (!isMobile()) {
                return "Please open this link on your mobile device.";
            }

            return redirect(
                "demomeapp://authorize-email?source=" .
                $source . "&token=" . $emailToken
            );
        }

        $status = $this->identityRepo->activateAuthorizationEmailProxy(
            $emailToken
        );

        if ($status === "not-found") {
            return abort(404, trans(
                'identity-proxy.code.' . $status
            ));
        } elseif ($status === "not-pending") {
            return abort(402, trans(
                'identity-proxy.code.' . $status
            ));
        } elseif ($status === "expired") {
            return abort(402, trans(
                'identity-proxy.code.' . $status
            ));
        } elseif ($status === true) {
            $source = Source::getModel()->where([
                'key' => $source
            ])->first();

            if ($source->key == "app.me_app") {
                $proxyIdentity = IdentityProxy::getModel()->where([
                    'auth_email_token' => $emailToken
                ])->first();

                return [
                    'type' => $proxyIdentity->identity_id > 2 ? 'personal' : 'organisation',
                    'access_token' => $proxyIdentity->access_token,
                    'success' => true
                ];
            }

            if ($source && $source->url) {
                return redirect($source->url);
            }

            return trans('identity-proxy.email.success');
        }

        return trans('identity-proxy.email.error');
    }

    public function status(Request $request) {
        $bearerToken = explode(' ', $request->headers->get('Authorization'));
        $accessToken = count($bearerToken) == 2 ? $bearerToken[1] : null;

        $identityService = app()->make('forus.services.identity');

        $proxyIdentityId = $identityService->proxyIdByAccessToken($accessToken);
        $proxyIdentityState = $identityService->proxyStateById($proxyIdentityId);
        $identityId = $identityService->identityIdByProxyId($proxyIdentityId);

        $isPending = $accessToken && $proxyIdentityState != 'active';
        $isInvalid = !$accessToken || !$proxyIdentityId || !$identityId;

        if ($isPending) {
            return [
                'status' => 'pending'
            ];
        }

        if ($isInvalid) {
            return [
                'status' => 'invalid'
            ];
        }

        return [
            'type' => Identity::getModel()->find($identityId)->type,
            'status' => 'active'
        ];
    }
}
