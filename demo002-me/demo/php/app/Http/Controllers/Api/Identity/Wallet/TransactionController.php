<?php

namespace App\Http\Controllers\Api\Identity\Wallet;

use App\Http\Requests\TransactionAskRequest;
use App\Http\Requests\TransactionSendRequest;
use App\Models\Intent;
use App\Models\Token;
use App\Models\Transaction;
use App\Models\User;
use App\Services\Forus\Identity\Models\Identity;
use App\Services\UUIDGeneratorService\Facades\UUIDGenerator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TransactionController extends Controller
{
    public function send(TransactionSendRequest $request)
    {
        $identity = Identity::getModel()->find($request->get('identity'));
        $targetIdentity = Identity::getModel()->where([
            'address' => $request->input('address')
        ])->first();

        $tokenId = $request->input('token.id');
        $targetToken = Token::getModel()->where('id', $tokenId)->first();

        $identityCoins = $identity->wallet->tokens()->where([
            'token_id' => $targetToken->id
        ])->first();

        $targetIdentityCoins = $targetIdentity->wallet->tokens()->where([
            'token_id' => $targetToken->id
        ])->first();

        $transactionAmount = intval($request->get('amount', 0));

        $identityCoins->amount -= $transactionAmount;
        $targetIdentityCoins->amount += $transactionAmount;

        $identityCoins->save();
        $targetIdentityCoins->save();

        Transaction::create([
            'token_id'          => $tokenId,
            'from_wallet_id'    => $identity->wallet->id,
            'to_wallet_id'      => $targetIdentity->wallet->id,
            'amount'            => $transactionAmount,
            'state'             => 'success'
        ]);

        return [
            'success' => 1
        ];
    }

    public function sendValidate(TransactionSendRequest $request)
    {
        return [
            'success' => true
        ];
    }

    public function ask(TransactionAskRequest $request)
    {
        $identity = $request->get('identity');

        $intent = Intent::create([
            'token'         => app()->make('uuid_generator')->generate(8, 4),
            'identity_id'   => $identity,
            'state'         => 'pending',
            'type'          => 'ask',
        ]);

        $intent->addMeta('amount', $request->input('amount'));
        $intent->addMeta('description', $request->input('description'));
        $intent->addMeta('token_id', $request->input('token.id'));

        return collect($intent)->only([
            'state', 'token', 'type'
        ]);
    }

    public function askCheck(Request $request)
    {
        $identity = $request->get('identity');
        $intent = Intent::getModel()->where(
            'token', $request->input('token')
        )->first();

        if (!$intent || ($intent->identity_id != $identity)) {
            return response()->json([
                'message' => "Intent not found or don't belongs to requester."
            ], 403);
        }

        return collect($intent)->only([
            'state'
        ]);
    }

    public function askAccept(Request $request)
    {
        $identity = Identity::getModel()->find($request->get('identity'));
        $intent = Intent::getModel()->where([
            'token' => $request->get('token')
        ])->first();

        $targetIdentity = $intent->identity;

        if ($intent->state != 'pending') {
            return response()->json([
                'message' => 'Transaction not pending!'
            ], 403);
        }

        $tokenId = $request->input('coin.id');
        $targetToken = Token::getModel()->where('id', $tokenId)->first();

        $identityTokens = $identity->wallet->tokens()->where([
            'token_id' => $targetToken->id
        ])->first();

        $targetIdentityTokens = $targetIdentity->wallet->tokens()->where([
            'token_id' => $targetToken->id
        ])->first();

        $transactionAmount = intval($request->get('amount', 0));

        $identityTokens->amount -= $transactionAmount;
        $targetIdentityTokens->amount += $transactionAmount;

        $identityTokens->save();
        $targetIdentityTokens->save();

        Transaction::create([
            'token_id'          => $tokenId,
            'from_wallet_id'    => $identity->wallet->id,
            'to_wallet_id'      => $targetIdentity->wallet->id,
            'amount'            => $transactionAmount,
            'state'             => 'success'
        ]);

        $intent->update([
            'state' => 'accepted'
        ]);

        return $intent;
    }

    public function askDecline(Request $request)
    {
        $authUser = $request->get('auth_user');
        $intent = Intent::whereToken($request->get('token'))->first();

        $intent->update([
            'state' => 'declined'
        ]);
    }
}
