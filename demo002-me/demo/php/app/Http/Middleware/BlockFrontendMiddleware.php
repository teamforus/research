<?php

namespace App\Http\Middleware;

use Closure;

class BlockFrontendMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        exit('Unauthorized');

        return $next($request);
    }
}
