<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class VoteResponse
 * @property Integer $id
 * @property Integer $identity_id
 * @property Integer $vote_id
 * @property Integer $vote_option_id
 * @package App\Models
 */
class VoteResponse extends Model
{
    protected $fillable = [
        'identity_id', 'vote_id', 'vote_option_id'
    ];
}
