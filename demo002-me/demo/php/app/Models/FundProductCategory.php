<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FundProductCategory
 * @property mixed $id
 * @property integer $fund_id
 * @property integer $product_category_id
 * @property Fund $fund
 * @property Product $product
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class FundProductCategory extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fund_id', 'product_category_id'
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
    public function product() {
        return $this->belongsTo(ProductCategory::class);
    }
}
