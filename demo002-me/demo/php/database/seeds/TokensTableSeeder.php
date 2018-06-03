<?php

use \App\Models\Token;

class TokensTableSeeder extends DatabaseSeeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // Tokens
        Token::create([
            "name" => 'Ether',
            "key" => 'eth',
            "abbr" => "ETH"
        ]);

        Token::create([
            "name" => 'BAT',
            "key" => 'bat',
            "abbr" => "BAT"
        ]);

        Token::create([
            "name" => 'Kindpakket Coins',
            "key" => 'kdp',
            "abbr" => 'KDP',
        ]);
    }
}
