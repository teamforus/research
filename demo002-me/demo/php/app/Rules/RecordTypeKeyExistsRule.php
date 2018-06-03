<?php

namespace App\Rules;

use App\Repositories\Interfaces\IRecordRepo;
use Illuminate\Contracts\Validation\Rule;

class RecordTypeKeyExistsRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
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
        $recordRepo = app()->make('forus.services.record');

        return collect($recordRepo->getRecordTypes())->pluck(
            'key'
            )->search($value) !== false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('validation.exists');
    }
}
