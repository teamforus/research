<?php

namespace App\Services\Forus\Identity\Models;

use App\Models\Wallet;
use App\Services\Forus\Record\Models\Record;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Identity
 * @property mixed $id
 * @property string $pin_code
 * @property string $type
 * @property Collection $types
 * @property Collection $proxies
 * @property String $address
 * @property integer $stem_points
 * @property Wallet $wallet
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class Identity extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'pin_code', 'type', 'address', 'stem_points'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function types() {
        return $this->hasManyThrough(
            IdentityType::class,
            IdentityActiveType::class
        );
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function proxies() {
        return $this->hasMany(IdentityProxy::class);
    }

    public function wallet() {
        return $this->hasOne(Wallet::class);
    }

    /**
     *
     */
    public function getName() {
        $records = Record::getModel()->where([
            'identity_id' => $this->id
        ])->get()->pluck('value', 'record_type.key');

        if ($this->type == 'personal') {
            return $records['first_name'] . ' ' . $records['last_name'];
        }

        return $records['name'];
    }
}
