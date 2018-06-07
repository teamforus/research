<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class WalletVoucherToken
 * @property mixed $id
 * @property integer $wallet_voucher_id
 * @property string $type
 * @property string $token
 * @property integer $expires_in
 * @property WalletVoucher $wallet_voucher
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class WalletVoucherToken extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'wallet_voucher_id', 'type', 'token', 'expires_in'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function wallet_voucher() {
        return $this->belongsTo(WalletVoucher::class);
    }
}
