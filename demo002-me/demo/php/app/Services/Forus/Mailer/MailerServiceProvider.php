<?php

namespace App\Services\Forus\Mailer;

use Illuminate\Support\ServiceProvider;
use Illuminate\Console\Scheduling\Schedule;

class MailerServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadMigrationsFrom(__DIR__ . '/migrations');

        $this->app->booted(function () {
            $schedule = app(Schedule::class);
            
            $schedule->command('forus.services.mailer:process')
            ->everyMinute();
            
            $schedule->command('forus.services.mailer:clear')
            ->hourly();
        });
    }
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('forus.services.mailer', function () {
            return new MailerService();
        });

        $this->commands([
            Commands\ProcessMailBusCommand::class,
            Commands\ClearMailBusCommand::class
        ]);
    }
}