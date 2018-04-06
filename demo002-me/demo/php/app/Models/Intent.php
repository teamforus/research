<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\IntentMeta;

class Intent extends Model
{
    protected $fillable = [
        'token', 'user_id', 'state', 'type'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function metas()
    {
        return $this->hasMany(IntentMeta::class);
    }

    public function addMeta($key, $value)
    {
        return $this->metas()->create(compact('key', 'value'));
    }
}
