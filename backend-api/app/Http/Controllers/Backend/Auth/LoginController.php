<?php

namespace App\Http\Controllers\Backend\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login()
    {
        return view('backend.auth.login');
    }

    public function handleLogin(Request $request)
    {

    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('auth.login');
    }
}
