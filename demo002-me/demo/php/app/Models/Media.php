<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Media
 * @property mixed $id
 * @property string $key
 * @property string $ext
 * @property integer $ratio
 * @property boolean $confirmed
 * @property integer $mediable_id
 * @property string $mediable_type
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class Media extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'key', 'ext', 'ratio', 'confirmed', 'mediable_id', 'mediable_type'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function metas() {
        return $this->hasMany(MediaMeta::class);
    }
}
