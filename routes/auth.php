<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'login'])->name('login');
    Route::get('register', [AuthController::class, 'register'])->name('register');

    Route::post('login', [AuthController::class, 'login_process']);
    Route::post('register-email', [AuthController::class, 'register_email']);
    Route::post('register-otp', [AuthController::class, 'register_otp']);
    Route::post('register-identity', [AuthController::class, 'register_identity']);
    Route::post('register-complete', [AuthController::class, 'register_complete']);

    Route::post('register-check-username', [AuthController::class, 'register_check_username']);
});

Route::middleware('auth')->group(function () {
});
