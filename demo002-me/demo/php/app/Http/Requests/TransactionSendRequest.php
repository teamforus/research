<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Coin;
use Illuminate\Http\Request;

class TransactionSendRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(Request $request)
    {
        return $request->get('auth_user');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(Request $request)
    {
        $authUser = $request->get('auth_user');
        $coinId = $request->input('token.id');

        if ($coinId && ($targetCoin = Coin::where('id', $coinId)->first())) {
            $userCoins = $authUser->user_coins()->where([
                'coin_id' => $targetCoin->id
            ])->first();
        } else {
            $userCoins = 0;
        }

        return [
            'token.id'      => 'required|exists:coins,id',
            'description'   => 'required',
            'amount'        => 'required|numeric|min:0.1|max:' . $userCoins->amount,
            'address'       => 'nullable|exists:users,public_address'
        ];
    }
}
