<?php

namespace App\Http\Requests;

use App\Models\Token;
use App\Services\Forus\Identity\Models\Identity;
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
        return $request->get('identity');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(Request $request)
    {
        $identity = Identity::whereKey($request->get('identity'))->first();
        $tokenId = $request->input('token.id');

        if ($tokenId && ($targetToken = Token::getModel()->where('id', $tokenId)->first())) {
            $userTokens = $identity->wallet->tokens()->where([
                'token_id' => $targetToken->id
            ])->first();

            if ($userTokens) {
                $userTokens = $userTokens->amount;
            } else {
                $userTokens = 0;
            }
        } else {
            $userTokens = 0;
        }

        return [
            'token.id'      => 'required|exists:tokens,id',
            'description'   => 'required',
            'amount'        => 'required|numeric|min:0.1|max:' . $userTokens,
            'address'       => 'nullable|exists:identities,address'
        ];
    }
}
