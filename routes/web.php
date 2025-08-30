<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PortalController;
use App\Http\Controllers\DeveloperController;
use App\Http\Controllers\HomeController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);

Route::middleware([AuthMiddleware::class])->group(function () {
    Route::get('portal', [PortalController::class, 'index']);
});

Route::get('/s', [DeveloperController::class, 'session_get']);
Route::get('/f', [DeveloperController::class, 'session_flush']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
