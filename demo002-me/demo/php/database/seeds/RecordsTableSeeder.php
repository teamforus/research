<?php

use Illuminate\Database\Seeder;
use App\Models\Record;

class RecordsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Record::create([
            'key' => 'first_name',
            'name' => 'First name',
        ]);

        Record::create([
            'key' => 'last_name',
            'name' => 'Last name',
        ]);

        Record::create([
            'key' => 'email',
            'name' => 'E-mail',
        ]);

        Record::create([
            'key' => 'bsn',
            'name' => 'BSN',
        ]);

        Record::create([
            'key' => 'phone',
            'name' => 'Phone',
        ]);
    }
}
