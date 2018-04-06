<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TestController extends Controller
{
    public function index(Request $reqeuest)
    {
        $authUser = $reqeuest->get('auth_user');
        
        return $authUser;
    }
}
