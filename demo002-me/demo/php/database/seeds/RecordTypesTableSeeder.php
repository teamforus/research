<?php

use \App\Services\Forus\Record\Models\RecordType;

class RecordTypesTableSeeder extends DatabaseSeeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RecordType::create([
            'id'        => 1,
            'key'       => 'first_name',
            'name'      => 'Voornaam',
        ]);

        RecordType::create([
            'id'        => 2,
            'key'       => 'last_name',
            'name'      => 'Achternaam',
        ]);

        RecordType::create([
            'id'        => 3,
            'key'       => 'email',
            'name'      => 'E-mail',
        ]);

        RecordType::create([
            'id'        => 4,
            'key'       => 'bsn',
            'name'      => 'BSN',
        ]);

        RecordType::create([
            'id'        => 5,
            'key'       => 'phone',
            'name'      => 'Phone',
        ]);

        RecordType::create([
            'id'        => 6,
            'key'       => 'name',
            'name'      => 'Telefoonnummer',
        ]);
    }
}
