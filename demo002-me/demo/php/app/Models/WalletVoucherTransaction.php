<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class WalletVoucherTransaction
 * @property mixed $id
 * @property integer $token_id
 * @property integer $provider_id
 * @property integer $wallet_voucher_id
 * @property integer $amount
 * @property string $type
 * @property string $state
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class WalletVoucherTransaction extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'token_id', 'provider_id', 'wallet_voucher_id', 'amount', 'type',
        'state'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function token() {
        return $this->belongsTo(Token::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function provider() {
        return $this->belongsTo(Provider::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function wallet_voucher() {
        return $this->belongsTo(WalletVoucher::class);
    }
}
