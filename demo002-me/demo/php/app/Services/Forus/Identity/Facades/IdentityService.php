<?php

namespace App\Services\Forus\Identity\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * Class IdentityService
 * @package App\Services\Forus\Identity\Facades
 */
class IdentityService extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'forus.services.identity';
    }
}
