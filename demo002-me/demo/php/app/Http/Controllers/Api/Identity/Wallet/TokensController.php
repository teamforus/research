<?php

namespace App\Http\Controllers\Api\Identity\Wallet;

use App\Models\Token;
use App\Models\Transaction;
use App\Services\Forus\Identity\Models\Identity;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TokensController extends Controller
{
    public function index(Request $request) {
        /** @var Identity $identity */
        $identity = Identity::getModel()->find($request->get('identity'));

        return $identity->wallet->tokens->keyBy('token.key')->map(function($walletToken) {
            return [
                'id' => $walletToken->token->id,
                'amount' => number_format($walletToken->amount, 2),
                'name' => $walletToken->token->name
            ];
        });
    }

    public function overview(Request $request, $tokenId) {
        /** @var Identity $identity */
        $identity = Identity::getModel()->find($request->get('identity'));
        $token = Token::getModel()->find($tokenId);
        $walletTokens = $identity->wallet->tokens()->where([
            'token_id' => $token->id
        ])->first();

        $transactions = Transaction::getModel()->where([
            'token_id' => $tokenId,
        ])->where(function($where) use ($identity) {
            return $where->where([
                'from_wallet_id' => $identity->wallet->id
            ])->orWhere([
                'to_wallet_id' => $identity->wallet->id
            ]);
        })->get()->map(function($val) use ($identity) {
            if ($val->to_wallet_id == $identity->wallet->id) {
                $val->dir = 'in';
                $val->counterpart = $val->from_wallet->identity->getName();
                $val->pretty_date = pretty_datetime($val->created_at);
            } else {
                $val->dir = 'out';
                $val->counterpart = $val->to_wallet->identity->getName();
                $val->pretty_date = pretty_datetime($val->created_at);
            }
            return $val;
        });

        return compact('token', 'walletTokens', 'transactions');
    }
}
