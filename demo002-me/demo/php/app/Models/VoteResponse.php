<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class VoteResponse
 * @property Integer $id
 * @property Integer $user_id
 * @property Integer $vote_id
 * @property Integer $vote_option_id
 * @package App\Models
 */
class VoteResponse extends Model
{
    protected $fillable = [
        'user_id', 'vote_id', 'vote_option_id'
    ];
}
