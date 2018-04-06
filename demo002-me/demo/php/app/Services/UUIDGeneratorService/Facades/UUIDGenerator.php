<?php

namespace App\Services\UUIDGeneratorService\Facades;

use Illuminate\Support\Facades\Facade;

class UUIDGenerator extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'uuid_generator';
    }
}
