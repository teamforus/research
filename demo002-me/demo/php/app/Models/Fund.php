<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Fund
 * @property mixed $id
 * @property integer $sponsor_id
 * @property string $state
 * @property integer $per_item_limit
 * @property string $name
 * @property string $description
 * @property Sponsor $owner
 * @property Collection $sponsors
 * @property Collection $metas
 * @property Collection $validators
 * @property Collection $products
 * @property Collection $product_categories
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class Fund extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sponsor_id', 'state', 'per_item_limit'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function owner() {
        return $this->belongsTo(Sponsor::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function sponsors() {
        return $this->hasMany(Sponsor::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function metas() {
        return $this->hasMany(FundMeta::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function validators() {
        return $this->hasMany(FundValidator::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function products() {
        return $this->hasManyThrough(
            Product::class,
            FundProduct::class
        );
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function product_categories() {
        return $this->hasManyThrough(
            ProductCategory::class,
            FundProductCategory::class
        );
    }
}
