<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Coin;

class UserCoin extends Model
{
    protected $fillable = [
        'user_id', 'coin_id', 'amount'
    ];

    public function coin()
    {
        return $this->belongsTo(Coin::class);
    }
}
