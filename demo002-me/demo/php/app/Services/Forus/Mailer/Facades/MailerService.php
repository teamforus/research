<?php

namespace App\Services\Forus\Mailer\Facades;

use Illuminate\Support\Facades\Facade;

class MailerService extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'forus.services.mailer';
    }
}
