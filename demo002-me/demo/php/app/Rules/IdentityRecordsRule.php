<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class IdentityRecordsRule implements Rule
{
    private $recordRepo;
    private $message;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->recordRepo = app()->make('forus.services.record');
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
        if (!is_array($value)) {
            $this->message = trans('validation.array');
            return false;
        }

        $requestKeys = array_keys($value);
        $recordTypes = collect(
            $this->recordRepo->getRecordTypes()
        )->pluck('key');

        foreach ($requestKeys as $requestKey) {
            if ($recordTypes->search($requestKey) === FALSE) {
                $this->message = trans('validation.unknown_record_key', [
                    'key' => $requestKey
                ]);
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
