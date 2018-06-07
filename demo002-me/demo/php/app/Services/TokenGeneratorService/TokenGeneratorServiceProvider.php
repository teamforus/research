<?php

namespace App\Services\TokenGeneratorService;

use Illuminate\Support\ServiceProvider;

class TokenGeneratorServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('token_generator', function () {
            return new TokenGenerator();
        });
    }
}