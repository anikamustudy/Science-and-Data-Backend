<?php

namespace App\Http\Controllers\Backend\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login()
    {
        return view('backend.auth.login');
    }

    public function handleLogin(LoginRequest $request)
    {
        if (auth()->attempt($request->validated())) {
            return redirect()->route('admin.home');
        }

        return back()
            ->withInput($request->only('email'))
            ->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ]);

    }

    public function logout()
    {
        auth()->logout();
        return redirect()->route('auth.login');
    }
}
