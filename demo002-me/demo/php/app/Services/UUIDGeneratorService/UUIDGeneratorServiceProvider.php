<?php

namespace App\Services\UUIDGeneratorService;

use Illuminate\Support\ServiceProvider;
use App\Services\UUIDGeneratorService\UUIDGenerator;

class UUIDGeneratorServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('uuid_generator', function () {
            return new UUIDGenerator();
        });
    }
}