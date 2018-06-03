<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FundSponsorInvestment
 * @property mixed $id
 * @property integer $fund_sponsor_id
 * @property integer $amount
 * @property FundSponsor $fund_sponsor
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class FundSponsorInvestment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fund_sponsor_id', 'amount'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function fund_sponsor() {
        return $this->belongsTo(FundSponsor::class);
    }
}
