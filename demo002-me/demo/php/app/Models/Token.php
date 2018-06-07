<?php

namespace App\Models;

use Carbon\Carbon;
use Dimsav\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Token
 * @property mixed $id
 * @property integer $fund_id
 * @property string $key
 * @property string $abbr
 * @property string $name
 * @property String $address
 * @property Fund $fund
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class Token extends Model
{
    use Translatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fund_id', 'key', 'address'
    ];

    /**
     * The attributes that are translatable.
     *
     * @var array
     */
    public $translatedAttributes = [
        'abbr', 'name'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function fund() {
        return $this->belongsTo(Fund::class);
    }
}
