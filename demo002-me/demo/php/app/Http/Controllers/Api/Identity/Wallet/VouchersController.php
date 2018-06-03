<?php

namespace App\Http\Controllers\Api\Identity\Wallet;

use App\Http\Requests\Api\Wallets\VoucherSplitRequest;
use App\Models\Intent;
use App\Models\Token;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Services\Forus\Identity\Models\Identity;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VouchersController extends Controller
{
    public function index(Request $request) {
        /** @var Identity $identity */
        $identity = Identity::getModel()->find($request->get('identity'));

        return $identity->wallet->vouchers->map(function($walletVoucher) {
            return [
                'id' => $walletVoucher->id,
                'amount' => number_format($walletVoucher->amount, 2),
                'name' => $walletVoucher->name
            ];
        });
    }

    public function overview(Request $request, $voucherId) {
        /** @var Identity $identity */
        $identity = Identity::getModel()->find($request->get('identity'));

        $voucher = $identity->wallet->vouchers()->where([
            'id' => $voucherId
        ])->first();

        return compact('voucher');
    }

    public function split(VoucherSplitRequest $request, $voucherId) {
        /** @var Identity $identity */
        $identity = Identity::getModel()->find($request->get('identity'));

        $voucher = $identity->wallet->vouchers()->where([
            'id' => $voucherId
        ])->first();

        $amount = floatval($request->input('amount'));

        $identity->wallet->vouchers()->create([
            'name'      => $voucher->name,
            'amount'    => $amount,
            'type'      => 'voucher',
            'state'     => 'active',
            'address'   => '0x' . app()->make('token_generator')->generate(40),
            'token_id'  => $voucher->token_id,
        ]);

        $voucher->amount -= $amount;
        $voucher->save();

        return [
            'success' => true
        ];
    }

    public function voucher(Request $request)
    {
        /** @var Identity $identity */
        $identity = Identity::getModel()->find($request->get('identity'));

        return [
            'funds' => number_format($identity->wallet->vouchers()->where([
                'token_id' => Token::getModel()->where('key', 'kdp')->first()->id
            ])->first()->amount, 2)
        ];
    }

    public function voucherQrCode(Request $request)
    {
        /** @var Identity $identity */
        $identity = Identity::getModel()->find($request->get('identity'));

        /** @var Intent $intent */
        $intent = Intent::create([
            'token' => app()->make('uuid_generator')->generate(8, 4),
            'identity_id' => $identity->id,
            'state' => 'pending',
            'type' => 'voucher'
        ]);

        $qr_code = base64_encode(QrCode::format('png')
            ->margin(1)->size(300)
            ->generate($intent->token));

        return "data:image/png;base64, " . $qr_code;
    }
}
