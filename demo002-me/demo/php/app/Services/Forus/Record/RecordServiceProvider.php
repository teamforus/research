<?php

namespace App\Services\Forus\Record;

use App\Services\Forus\Identity\Repositories\IdentityRepo;
use App\Services\Forus\Identity\Repositories\Interfaces\IIdentityRepo;
use App\Services\Forus\Record\Repositories\Interfaces\IRecordRepo;
use App\Services\Forus\Record\Repositories\RecordRepo;
use Illuminate\Support\ServiceProvider;

class RecordServiceProvider extends ServiceProvider
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
        $this->app->bind(IRecordRepo::class, RecordRepo::class);

        $this->app->singleton('forus.services.record', function () {
            return app(IRecordRepo::class);
        });
    }
}