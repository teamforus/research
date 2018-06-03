<?php

namespace App\Services\Forus\Identity;

use App\Services\Forus\Identity\Repositories\IdentityRepo;
use App\Services\Forus\Identity\Repositories\Interfaces\IIdentityRepo;
use Illuminate\Support\ServiceProvider;

class IdentityServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadMigrationsFrom(__DIR__ . '/migrations');
    }
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(IIdentityRepo::class, IdentityRepo::class);

        $this->app->singleton('forus.services.identity', function () {
            return app(IIdentityRepo::class);
        });
    }
}