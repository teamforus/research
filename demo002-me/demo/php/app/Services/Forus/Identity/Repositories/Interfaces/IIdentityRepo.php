<?php
namespace App\Services\Forus\Identity\Repositories\Interfaces;

interface IIdentityRepo {
    /**
     * Make new identity
     * @param string $type
     * @param string|null $pinCode
     * @param array $records
     * @return mixed
     */
    public function make(
        string $type,
        string $pinCode = null,
        array $records = []
    );

    /**
     * Create new proxy for given identity
     * @param $identityId
     * @return array
     */
    public function makeIdentityPoxy(
        $identityId
    );

    /**
     * @param $proxyIdentityId
     * @throws \Exception
     */
    public function getProxyAccessToken(
        $proxyIdentityId
    );

    /**
     * Get proxy identity by access token
     * @param string $access_token
     * @return mixed|void
     */
    public function proxyIdByAccessToken(
        string $access_token = null
    );

    /**
     * Get proxy identity by access token
     * @param mixed $proxyIdentityId
     * @return mixed
     */
    public function identityIdByProxyId(
        $proxyIdentityId = null
    );

    /**
     * Get proxy identity state by id
     * @param mixed $proxyIdentityId
     * @return mixed
     */
    public function proxyStateById(
        $proxyIdentityId = null
    );

    /**
     * Destroy proxy identity by id
     * @param mixed $proxyIdentityId
     * @return mixed|void
     * @throws \Exception
     */
    public function destroyProxyIdentity(
        $proxyIdentityId
    );

    /**
     * @param $proxyIdentityId
     * @return bool
     * @throws \Exception
     */
    public function hasPinCode(
        $proxyIdentityId
    );

    /**
     * @param mixed $proxyIdentityId
     * @param string $pinCode
     * @return bool
     * @throws \Exception
     */
    public function cmpPinCode(
        $proxyIdentityId,
        $pinCode
    );

    /**
     * @param $proxyIdentityId
     * @param string $pinCode
     * @param string $oldPinCode
     * @return bool
     * @throws \Exception
     */
    public function updatePinCode(
        $proxyIdentityId,
        $pinCode,
        $oldPinCode = null
    );

    /**
     * Make code authorization proxy identity
     * @return array
     */
    public function makeAuthorizationCodeProxy();

    /**
     * Make token authorization proxy identity
     * @return array
     */
    public function makeAuthorizationTokenProxy();

    /**
     * Make email token authorization proxy identity
     * @param mixed $identityId
     * @return array
     */
    function makeAuthorizationEmailProxy($identityId);

    /**
     * Authorize proxy identity by code
     * @param $identityId
     * @param string $code
     * @return mixed
     */
    public function activateAuthorizationCodeProxy(
        $identityId,
        string $code
    );

    /**
     * Authorize proxy identity by token
     * @param $identityId
     * @param string $token
     * @return mixed
     */
    public function activateAuthorizationTokenProxy(
        $identityId,
        string $token
    );

    /**
     * Authorize proxy identity by email token
     * @param string $email_token
     * @return mixed
     */
    public function activateAuthorizationEmailProxy(
        string $email_token
    );
}
