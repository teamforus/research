<?php

namespace App\Http\Requests\Api;

use App\Rules\IdentityPinCodeRule;
use App\Rules\IdentityRecordsRule;
use App\Rules\IdentityRecordsUniqueRule;
use Illuminate\Foundation\Http\FormRequest;

class IdentityStoreRequest extends FormRequest
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
     *
     * @return array
     */
    public function rules()
    {
        return [
            'pin_code'          => ['nullable', new IdentityPinCodeRule()],
            'type'              => 'required|in:personal,organisation',
            'records'           => ['required', 'array', new IdentityRecordsRule()],
            'records.email'     => ['required', 'email', new IdentityRecordsUniqueRule('email')],

            'records.first_name'    => ['required'],
            'records.last_name'     => ['required'],
            'records.bsn'           => ['required'],
            'records.phone'         => ['required'],
        ];
    }
}
