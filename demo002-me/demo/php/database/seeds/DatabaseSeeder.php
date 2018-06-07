<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        // $this->call(CoinsTableSeeder::class);
        // $this->call(RecordsTableSeeder::class);

        $this->call(LanguagesTableSeeder::class);
        $this->call(RecordTypesTableSeeder::class);
        $this->call(SourceTableSeeder::class);

        $this->call(TokensTableSeeder::class);
        $this->call(IdentitiesSeeder::class);
    }
}
