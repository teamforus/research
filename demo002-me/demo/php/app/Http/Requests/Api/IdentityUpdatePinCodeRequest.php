<?php

namespace App\Http\Requests\Api;

use App\Rules\IdentityPinCodeRule;
use App\Rules\IdentityPinCodeOldRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class IdentityUpdatePinCodeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     * @param  Request $request
     * @throws \Exception
     * @return array
     */
    public function rules(Request $request)
    {
        $proxyIdentity = $request->get('proxyIdentity');

        return [
            'pin_code'      => [new IdentityPinCodeRule()],
            'old_pin_code'  => [new IdentityPinCodeOldRule($proxyIdentity)]
        ];
    }
}
