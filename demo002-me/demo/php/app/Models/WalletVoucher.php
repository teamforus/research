<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class WalletVoucher
 * @property mixed $id
 * @property integer $wallet_id
 * @property integer $token_id
 * @property integer $product_id
 * @property integer $amount
 * @property string $type
 * @property string $state
 * @property String $address
 * @property Wallet $wallet
 * @property Token $token
 * @property Product $product
 * @property Collection $voucher_tokens
 * @property Collection $voucher_transactions
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class WalletVoucher extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'wallet_id', 'token_id', 'product_id', 'amount', 'type', 'state',
        'address', 'name'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function wallet() {
        return $this->belongsTo(Wallet::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function token() {
        return $this->belongsTo(Token::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product() {
        return $this->belongsTo(Product::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function voucher_tokens() {
        return $this->hasMany(WalletVoucherToken::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function voucher_transactions() {
        return $this->hasMany(WalletVoucherTransaction::class);
    }
}
