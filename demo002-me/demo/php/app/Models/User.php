<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Services\UUIDGeneratorService\Facades\UUIDGenerator;

/**
 * Class User
 * @property Integer $id
 * @property Integer $stem_points;
 * @package App\Models
 */
class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'public_address', 'passphrase', 'password', 'access_token', 'stem_points'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'passphrase'
    ];

    public function user_records()
    {
        return $this->hasMany(UserRecord::class);
    }

    public function user_coins()
    {
        return $this->hasMany(UserCoin::class);
    }

    public function voucher()
    {
        return $this->hasOne(Voucher::class);
    }

    public function fillRecords($records)
    {
        foreach ($records as $key => $value) {
            $this->user_records()->create([
                'record_id' => Record::where('key', $key)->first()->id, 
                'value' => $value
            ]);
        }
    }

    public function initUser()
    {
        $this->user_coins()->create([
            'coin_id' => Coin::where('key', 'ETH')->first()->id,
            'amount' => rand(1000, 5000) / 100
        ]);

        $this->user_coins()->create([
            'coin_id' => Coin::where('key', 'BAT')->first()->id,
            'amount' => rand(10000, 50000) / 100
        ]);

        $this->user_coins()->create([
            'coin_id' => Coin::where('key', 'KDP')->first()->id,
            'amount' => 0
        ]);

        $this->voucher()->create([
            'amount' => rand(1,3) * 300,
            'address' => UUIDGenerator::generate(8, 4)
        ]);
    }
}
