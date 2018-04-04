<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Services\UUIDGeneratorService\Facades\UUIDGenerator;
use App\Http\Controllers\Controller;
use App\Models\Record;
use App\Models\Intent;

class UserController extends Controller
{
    public function user(Request $request)
    {
        $authUser = $request->get('auth_user');

        return collect($authUser)->only([
            'public_address',
            'stem_points'
        ]);
    }

    public function records(Request $request)
    {
        $authUser = $request->get('auth_user');

        return $authUser->user_records->keyBy('record.key')->map(function($userRecord) {
            return [
                'value' => $userRecord->value,
                'state' => $userRecord->state,
                'name' => $userRecord->record->name,
                'key' => $userRecord->record->key,
            ];
        });
    }

    public function tokens(Request $request)
    {
        $authUser = $request->get('auth_user');

        return $authUser->user_coins->keyBy('coin.key')->map(function($userCoin) {
            return [
                'id' => $userCoin->coin->id,
                'amount' => number_format($userCoin->amount, 2),
                'name' => $userCoin->coin->name
            ];
        });
    }


    public function validateRecord(Request $request)
    {
        $authUser = $request->get('auth_user');

        $authUser->user_records()->where('record_id', Record::where([
            'key' => $request->get('key')
        ])->first()->id)->update([
            'state' => 'valid'
        ]);

        return [];
    }

    public function voucher(Request $request)
    {
        $authUser = $request->get('auth_user');

        return [
            'funds' => number_format($authUser->voucher->amount, 2)
        ];
    }

    public function voucherQrCode(Request $request)
    {
        $authUser = $request->get('auth_user');
        // $voucher = $authUser->voucher;

        $intent = Intent::create([
            'token' => UUIDGenerator::generate(8, 4),
            'user_id' => $authUser->id,
            'state' => 'pending',
            'type' => 'voucher'
        ]);

        $qr_code = base64_encode(QrCode::format('png')
            ->margin(1)->size(300)
            ->generate($intent->token));

        return "data:image/png;base64, " . $qr_code;
    }
}
