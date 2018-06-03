<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FundValidator
 * @property mixed $id
 * @property integer $fund_id
 * @property string $url
 * @property string $token
 * @property Fund $fund
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class FundValidator extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fund_id', 'url', 'token'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function fund() {
        return $this->belongsTo(Fund::class);
    }
}
