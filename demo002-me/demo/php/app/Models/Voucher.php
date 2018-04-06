<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Voucher extends Model
{
    protected $fillable = [
        'user_id', 'amount', 'address'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
