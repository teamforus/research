<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Sponsor
 * @property mixed $id
 * @property integer $identity_id
 * @property Identity $identity
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class Sponsor extends Model
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
}
