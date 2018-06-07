<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Vote
 * @property Integer $id
 * @property String $title
 * @property String $description
 * @property String $state
 * @property Integer $identity_id
 * @package App\Models
 */
class Vote extends Model
{
    protected $fillable = [
        'title', 'description', 'state', 'identity_id'
    ];

    public function options() {
        return $this->hasMany(VoteOption::class)->orderBy('order');
    }

    public function responses() {
        return $this->hasMany(VoteResponse::class);
    }
}
