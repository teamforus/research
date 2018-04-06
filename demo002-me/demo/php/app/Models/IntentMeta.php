<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IntentMeta extends Model
{
    protected $fillable = [
        'intent_id', 'key', 'value'
    ];
}
