<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class IdentityPinCodeRule implements Rule
{
    private $message;
    private $digits;

    /**
     * Create a new rule instance.
     * @param integer $digits
     * @return void
     */
    public function __construct($digits = 4)
    {
        $this->digits = $digits;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (empty($value)) {
            $this->message = trans('validation.required');

            return false;
        }

        $expression = '/^[0-9]{' . $this->digits .'}\z/';

        if (!preg_match($expression, $value)) {
            $this->message = trans('validation.digits', [
                'digits' => $this->digits
            ]);

            return false;
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
