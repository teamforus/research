<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Transaction
 * @property mixed $id
 * @property integer $token_id
 * @property integer $from_wallet_id
 * @property integer $to_wallet_id
 * @property integer $amount
 * @property string $state
 * @property Token $token
 * @property Wallet $from_wallet
 * @property Wallet $to_wallet
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class Transaction extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'token_id', 'from_wallet_id', 'to_wallet_id', 'amount', 'state'
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
    public function from_wallet() {
        return $this->belongsTo(Wallet::class, 'from_wallet_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function to_wallet() {
        return $this->belongsTo(Wallet::class, 'to_wallet_id');
    }
}
