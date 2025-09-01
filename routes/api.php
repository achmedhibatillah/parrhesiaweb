<?php

use App\Http\Controllers\ServerManageImage;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::middleware([AuthMiddleware::class])->group(function () {
    Route::post('storeimage', [ServerManageImage::class, 'store']);
    Route::post('destroyimage', [ServerManageImage::class, 'destroy']);
// });