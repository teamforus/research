<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class IdentityPinCodeOldRule implements Rule
{
    protected $proxyIdentity;
    protected $message;

    /**
     * Create a new rule instance.
     * @param mixed $proxyIdentity
     * @return void
     */
    public function __construct(
        $proxyIdentity
    ) {
        $this->proxyIdentity = $proxyIdentity;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     * @throws \Exception
     */
    public function passes($attribute, $value)
    {
        $identityRepo = app()->make('forus.services.identity');

        $hasPinCode = $identityRepo->hasPinCode($this->proxyIdentity);

        if ($hasPinCode) {
            if (empty($value)) {
                $this->message = trans('validation.required');
                return false;
            }

            if (!$identityRepo->cmpPinCode($this->proxyIdentity, $value)) {
                $this->message = trans('validation.old_pin_code');
                return false;
            }
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->message;
    }
}
