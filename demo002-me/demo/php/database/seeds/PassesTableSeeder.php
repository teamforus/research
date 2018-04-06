<?php

use Illuminate\Database\Seeder;

class PassesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Pass::create([
            'name' => 'Paradign NYE',
            'desk' => 'Stempass',
            'key' => 'Flight 28.03.2018',
        ]);

        Pass::create([
            'name' => 'Paradign NYE',
            'desk' => 'Stempass',
            'key' => 'Flight 28.03.2018',
        ]);

        Pass::create([
            'name' => 'Paradign NYE',
            'desk' => 'Stempass',
            'key' => 'Flight 28.03.2018',
        ]);
    }
}
