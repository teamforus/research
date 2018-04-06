<?php

use Illuminate\Database\Seeder;
use App\Models\Coin;

class CoinsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // coins
        Coin::create([
            "name" => 'Ether',
            "key" => 'ETH'
        ]);

        Coin::create([
            "name" => 'BAT',
            "key" => 'BAT'
        ]);

        Coin::create([
            "name" => 'Kindpakket Coins',
            "key" => 'KDP'
        ]);
    }
}
