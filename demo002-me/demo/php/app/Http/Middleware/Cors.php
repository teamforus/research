<?php

namespace App\Http\Middleware;

use Closure;

class Cors
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
        $allowed_origins = collect([
            '*']);

        $allowed_methods = collect([
            'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']);

        $allowed_headers = collect([
            'Content-Type', 'Access-Control-Allow-Headers', 'Authorization', 
            'X-Requested-With', 'Device-Id', 'Locale', 'Access-Token']);
        
        $response = $next($request);

        $response->headers->set(
            'Access-Control-Allow-Headers',
            $allowed_headers->implode(', '));

        $response->headers->set(
            'Access-Control-Allow-Origin', 
            $allowed_origins->implode(', '));
        
        $response->headers->set(
            'Access-Control-Allow-Methods', 
            $allowed_methods->implode(', '));

        return $response;
    }
}
