<?php

namespace App\Services\Forus\Identity\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class IdentityActiveType
 * @property mixed $id
 * @property mixed $identity_id
 * @property mixed $identity_type_id
 * @property string $state
 * @property Identity $identity
 * @property IdentityType $identity_type
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class IdentityActiveType extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'identity_id', 'identity_type_id', 'state'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function identity() {
        return $this->belongsTo(Identity::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function identity_type() {
        return $this->belongsTo(IdentityType::class);
    }
}
