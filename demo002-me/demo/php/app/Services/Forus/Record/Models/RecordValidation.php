<?php

namespace App\Services\Forus\Record\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class RecordValidation
 * @property mixed $id
 * @property integer $validator_id
 * @property integer $record_id
 * @property string $state
 * @property Record $record
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class RecordValidation extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'validator_id', 'record_id', 'state'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function record() {
        return $this->belongsTo(Record::class);
    }
}
