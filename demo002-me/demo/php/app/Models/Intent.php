<?php

namespace App\Models;

use App\Services\Forus\Identity\Models\Identity;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Intent
 * @property mixed $id
 * @property string $token
 * @property int $identity_id
 * @property string $state
 * @property string $type
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class Intent extends Model
{
    protected $fillable = [
        'token', 'identity_id', 'state', 'type'
    ];

    public function identity()
    {
        return $this->belongsTo(Identity::class);
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
