<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Provider
 * @property mixed $id
 * @property integer $identity_id
 * @property Identity $identity
 * @property Collection $product_categories;
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class Provider extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'identity_id'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function identity() {
        return $this->belongsTo(Identity::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function product_categories() {
        return $this->hasManyThrough(
            ProductCategory::class,
            ProviderProductCategory::class
        );
    }
}
