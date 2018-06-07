<?php

namespace App\Services\Forus\Record\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * Class IdentityService
 * @package App\Services\Forus\Identities\Facades
 */
class RecordService extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'forus.services.record';
    }
}