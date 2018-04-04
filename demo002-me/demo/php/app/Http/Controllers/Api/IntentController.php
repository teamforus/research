<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Controller;
use App\Models\Intent;
use App\Models\Coin;

class IntentController extends Controller
{
    public function read(Request $request, $intentToken)
    {
        $authUser = $request->get('auth_user');

        $intent = Intent::where([
            'token' => $intentToken
        ])->first();

        if (!$intent) {
            return response()->json([
                'message' => 'Not found.'
            ], 404);
        }

        if ($intent->type == 'voucher') {
            $response = collect($intent)->merge([
                'voucher' => $authUser->voucher
            ]);
        }

        if ($intent->type == 'ask') {
            $response = collect($intent)->merge([
                'coin' => Coin::whereId($intent->metas()->where([
                    'key' => 'token_id'
                ])->first()->value)->first(),
                'amount' => number_format($intent->metas()->where([
                    'key' => 'amount'
                ])->first()->value, 2),
            ]);
        }

        if ($intent->type == 'auth') {
            $response = $intent;
        }

        return $response;
    }

    public function accept(Request $request, $intentToken)
    {
        $authUser = $request->get('auth_user');

        $intent = Intent::where([
            'token' => $intentToken
        ])->first();

        if (!$intent) {
            return response()->json([
                'message' => 'Not found.'
            ], 404);
        } elseif ($intent->state != 'pending') {
            return response()->json([
                'message' => 'Not pending.'
            ], 403);
        } elseif ($intent->user_id && ($intent->user_id != $authUser->id)) {
            return response()->json([
                'message' => 'Foreign token.'
            ], 403);
        }

        if (!$intent->user_id) {
            $intent->update([
                'user_id' => $authUser->id
            ]);
        }

        $intent->update([
            'state' => 'authorized'
        ]);

        if ($intent->type == 'voucher') {
            $userCoins = $intent->user->user_coins()->where([
                'coin_id' => Coin::where('key', 'KDP')->first()->id
            ])->first();

            $userCoins->amount += $intent->user->voucher->amount;
            $intent->user->voucher->update([
                'amount' => 0
            ]);

            $userCoins->update();
        }

        return $intent;
    }

    public function decline(Request $request, $intentToken)
    {
        $intent = Intent::where([
            'token' => $intentToken
        ])->first();

        if (!$intent) {
            return response()->json([
                'message' => 'Not found.'
            ], 404);
        } elseif ($intent->state != 'pending') {
            return response()->json([
                'message' => 'Not pending.'
            ], 403);
        } elseif ($intent->user_id && ($intent->user_id != $authUser->id)) {
            return response()->json([
                'message' => 'Foreign token.'
            ], 403);
        }

        if (!$intent->user_id) {
            $intent->update([
                'user_id' => $authUser->id
            ]);
        }

        $intent->update([
            'state' => 'declined'
        ]);

        return $intent;
    }

    public function make()
    {

    }
}
