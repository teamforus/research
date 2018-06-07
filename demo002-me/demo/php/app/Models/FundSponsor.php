<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FundSponsor
 * @property mixed $id
 * @property integer $fund_id
 * @property integer $sponsor_id
 * @property string $state
 * @property Fund $fund
 * @property Product $product
 * @property Collection $investments
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class FundSponsor extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fund_id', 'sponsor_id', 'state'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function fund() {
        return $this->belongsTo(Fund::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function sponsor() {
        return $this->belongsTo(Sponsor::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function investments() {
        return $this->hasMany(FundSponsorInvestment::class);
    }
}
