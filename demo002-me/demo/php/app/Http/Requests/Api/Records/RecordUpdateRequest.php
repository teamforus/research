<?php

namespace App\Http\Requests\Api\Records;

use App\Rules\RecordCategoryIdRule;
use Illuminate\Foundation\Http\FormRequest;

class RecordUpdateRequest extends FormRequest
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
            'order' => 'nullable|numeric|min:0',
            'record_category_id' => ['nullable', new RecordCategoryIdRule()],
        ];
    }
}
