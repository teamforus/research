<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\TransactionSendRequest;
use App\Http\Requests\TransactionAskRequest;

use App\Services\UUIDGeneratorService\Facades\UUIDGenerator;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Intent;
use App\Models\User;
use App\Models\Coin;

class TransactionController extends Controller
{
    public function send(TransactionSendRequest $request)
    {
        $authUser = $request->get('auth_user');
        $targetUser = User::where([
            'public_address' => $request->get('address')
        ])->first();

        $coinId = $request->input('token.id');
        $targetCoin = Coin::where('id', $coinId)->first();

        $userCoins = $authUser->user_coins()->where([
            'coin_id' => $targetCoin->id
        ])->first();

        $targetUserCoins = $targetUser->user_coins()->where([
            'coin_id' => $targetCoin->id
        ])->first();

        $transactionAmount = intval($request->get('amount', 0));

        $userCoins->amount -= $transactionAmount;
        $targetUserCoins->amount += $transactionAmount;

        $userCoins->save();
        $targetUserCoins->save();

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
        $authUser = $request->get('auth_user');

        $intent = Intent::create([
            'token'     => UUIDGenerator::generate(8, 4),
            'user_id'   => $authUser->id, 
            'state'     => 'pending', 
            'type'      => 'ask',
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
        $authUser = $request->get('auth_user');
        $intent = Intent::whereToken($request->input('token'))->first();

        if (!$intent || ($intent->user_id != $authUser->id)) {
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
        $authUser = $request->get('auth_user');
        $intent = Intent::whereToken($request->get('token'))->first();
        $targetUser = $intent->user;

        if ($intent->state != 'pending') {
            return response()->json([
                'message' => 'Transaction not pending!'
            ], 403);
        }

        $coinId = $request->input('coin.id');
        $targetCoin = Coin::where('id', $coinId)->first();

        $userCoins = $authUser->user_coins()->where([
            'coin_id' => $targetCoin->id
        ])->first();

        $targetUserCoins = $targetUser->user_coins()->where([
            'coin_id' => $targetCoin->id
        ])->first();

        $transactionAmount = intval($request->get('amount', 0));

        $userCoins->amount -= $transactionAmount;
        $targetUserCoins->amount += $transactionAmount;

        $userCoins->save();
        $targetUserCoins->save();

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
