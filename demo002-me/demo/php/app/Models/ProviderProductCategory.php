<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ProviderProductCategory
 * @property mixed $id
 * @property integer $provider_id
 * @property integer $product_category_id
 * @property Provider $provider
 * @property ProductCategory $product_category
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class ProviderProductCategory extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'provider_id', 'product_category_id'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function provider() {
        return $this->hasOne(Provider::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function product_category() {
        return $this->hasOne(ProductCategory::class);
    }
}
