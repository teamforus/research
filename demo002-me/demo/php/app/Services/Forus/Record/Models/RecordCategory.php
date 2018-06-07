<?php

namespace App\Services\Forus\Record\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class RecordCategory
 * @property mixed $id
 * @property integer $identity_id
 * @property string $name
 * @property integer $order
 * @property Collection $records
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class RecordCategory extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'identity_id', 'name', 'order'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function records() {
        return $this->hasMany(Record::class);
    }
}
