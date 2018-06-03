<?php

namespace App\Http\Requests\Api\Wallets;

use App\Services\Forus\Identity\Models\Identity;
use Illuminate\Foundation\Http\FormRequest;

class VoucherSplitRequest extends FormRequest
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
        $request = request();
        $identity = Identity::getModel()->find($request->get('identity'));

        $voucher = $identity->wallet->vouchers()->where([
            'id' => $request->route('voucherId')
        ])->first();

        return [
            'amount' => 'required|numeric|between:.1,' . $voucher->amount,
        ];
    }
}
