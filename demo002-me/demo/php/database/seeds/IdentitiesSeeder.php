<?php

use \App\Services\Forus\Identity\Models\IdentityProxy;

class IdentitiesSeeder extends DatabaseSeeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $identityRepo = app()->make('forus.services.identity');
        $recordsRepo = app()->make('forus.services.record');

        // DigiD
        $proxyIdentityId = $identityRepo->make('organisation', '1234', [
            'name' => 'DigiD',
            'email' => 'info@example.com',
            'phone' => '1234567890',
        ]);

        \App\Models\Validator::create([
            'identity_id'   => $proxyIdentityId,
            'key'           => 'digid',
            'name'          => 'DigiD'
        ]);

        // Zuidhorn
        $identityId = $identityRepo->make('organisation', '1234', [
            'name' => 'Gemeente Zuidhorn',
            'email' => 'info@example.com',
            'phone' => '1234567890',
        ]);

        $proxyIdentityId = $identityRepo->makeIdentityPoxy($identityId);

        IdentityProxy::getModel()->where([
            'id' => $proxyIdentityId
        ])->update([
            'access_token' => '78f263fa90011fb26147b3f8c0004a2aa0e14cf94657dc859daf9485de6e4d5b'
        ]);

        /** @var \App\Services\Forus\Record\Models\Record $record */
        \App\Services\Forus\Record\Models\Record::getModel()->where([
            'identity_id' => $identityId,
        ])->get()->each(function($record) {
            /** @var \App\Services\Forus\Record\Models\Record $record */
            $record->validations()->create([
                'validator_id' => \App\Models\Validator::getModel()->where('key', 'digid')->first()->id,
                'state' => 'success'
            ]);
        });
    }
}
