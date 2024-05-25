<?php

use App\Http\Controllers\Api\V1\Auth\AuthController;
use App\Http\Controllers\Api\V1\ScientificDataController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/scientific-data', [ScientificDataController::class, 'index']);
    Route::post('/scientific-data', [ScientificDataController::class, 'store']);
    Route::get('/scientific-data/{id}', [ScientificDataController::class, 'show']);
    Route::put('/scientific-data/{id}', [ScientificDataController::class, 'update']);
    Route::delete('/scientific-data/{id}', [ScientificDataController::class, 'destroy']);
});
