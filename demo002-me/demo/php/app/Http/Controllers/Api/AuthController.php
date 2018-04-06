<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\RegisterRequest;
use App\Services\UUIDGeneratorService\Facades\UUIDGenerator;
use App\Models\Intent;
use App\Models\User;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $records = $request->only([
            'first_name', 'last_name', 'email', 'bsn', 'phone'
        ]);

        $user = User::create([
            'email' => $records['email'],
            'password' => Hash::make(UUIDGenerator::generate(8, 4)),
            'access_token' => UUIDGenerator::generate(8, 4),
            'public_address' => UUIDGenerator::generate(8, 4),
            'passphrase' => UUIDGenerator::generate(8, 4),
        ]);

        $user->fillRecords($records);
        $user->initUser();

        return collect($user)->only('access_token');
    }

    public function token(Request $request)
    {
        $intent = Intent::create([
            'token' => UUIDGenerator::generate(8, 4),
            'user_id' => null,
            'state' => 'pending',
            'type' => 'auth'
        ]);

        return collect($intent)->only([
            'token'
        ]);
    }

    public function checkToken(Request $request)
    {
        $intent = Intent::where([
            'token' => $request->get('token')
        ])->first();

        if (!$intent) {
            return response()->json([
                'error' => 'Not found.'
            ], 404);
        }

        return collect($intent)->only([
            'state'
        ]);   
    }

    public function exchangeToken(Request $request)
    {
        $intent = Intent::where([
            'token' => $request->get('token')
        ])->first();

        if (!$intent) {
            return response()->json([
                'error' => 'Not found.'
            ], 404);
        } elseif ($intent->state == 'used') {
            return response()->json([
                'error' => 'Token used.'
            ], 403);
        } elseif ($intent->state != 'authorized') {
            return response()->json([
                'error' => 'Unauthorized.'
            ], 403);
        }

        $intent->update([
            'state' => 'used'
        ]);

        return collect($intent->user)->only([
            'access_token'
        ]);   
    }
}
