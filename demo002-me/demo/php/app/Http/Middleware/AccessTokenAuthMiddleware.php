<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Support\Facades\Response;

class AccessTokenAuthMiddleware
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
        $access_token = $request->headers->get('Access-Token', 'no-token');
        $user = User::where([
            'access_token' => $access_token
        ])->first();

        if (!$user) {
            return Response::json([
                'error' => 'Unauthorized.'
            ], 401);
        }

        $request->attributes->add(['auth_user' => $user]);

        return $next($request);
    }
}
