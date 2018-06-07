<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class WalletToken
 * @property mixed $id
 * @property integer $wallet_id
 * @property integer $token_id
 * @property integer $amount
 * @property Wallet $wallet
 * @property Token $token
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class WalletToken extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'wallet_id', 'token_id', 'amount'
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
}
