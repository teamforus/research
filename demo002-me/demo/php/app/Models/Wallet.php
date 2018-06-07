<?php

namespace App\Models;

use App\Services\Forus\Identity\Models\Identity;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Wallet
 * @property mixed $id
 * @property integer $identity_id
 * @property Identity $identity
 * @property Collection $tokens
 * @property Collection $vouchers
 * @property Collection $assets
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class Wallet extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'identity_id'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function identity() {
        return $this->belongsTo(Identity::class);
    }

    public function tokens() {
        return $this->hasMany(WalletToken::class);
    }

    public function vouchers() {
        return $this->hasMany(WalletVoucher::class);
    }

    public function assets() {
        return $this->hasMany(WalletAsset::class);
    }
}
