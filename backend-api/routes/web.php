<?php

use App\Http\Controllers\Backend\Auth\LoginController;
use App\Http\Controllers\Backend\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('auth/login', [LoginController::class, 'login'])->name('auth.login');
Route::post('auth/login', [LoginController::class, 'handleLogin'])->name('auth.handle.login');

Route::get('auth/register', [RegisterController::class, 'register'])->name('auth.register');
Route::post('auth/register', [RegisterController::class, 'handleRegister'])->name('auth.handle.register');
