<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Record;

class UserRecord extends Model
{
    protected $fillable = [
        'user_id', 'record_id', 'value', 'state'
    ];

    public function record()
    {
        return $this->belongsTo(Record::class);
    }
}
