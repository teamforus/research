<?php

namespace App\Services\Forus\Record\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class RecordTypeTranslation
 * @property mixed $id
 * @property integer $record_type_id
 * @property string $locale
 * @property string $name
 * @property RecordType $record_type
 * @package App\Models
 */
class RecordTypeTranslation extends Model
{
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function record_type() {
        return $this->belongsTo(RecordType::class);
    }
}
