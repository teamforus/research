<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class VoteOption
 * @property Integer $id
 * @property Integer $order
 * @property String $value
 * @property Integer $vote_id
 * @package App\Models
 */
class VoteOption extends Model
{
    protected $fillable = [
        'order', 'value', 'vote_id'
    ];

    public function responses() {
        return $this->hasMany(VoteResponse::class);
    }
}
