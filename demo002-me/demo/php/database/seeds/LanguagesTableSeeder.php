<?php

use App\Models\Language;

class LanguagesTableSeeder extends DatabaseSeeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Language::create([
            'id'        => 1,
            'locale'    => 'en',
            'name'      => 'English'
        ]);

        Language::create([
            'id'        => 2,
            'locale'    => 'nl',
            'name'      => 'Dutch'
        ]);
    }
}
