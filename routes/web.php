<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PortalController;
use App\Http\Controllers\DeveloperController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ServerManageImage;
use App\Http\Controllers\ServerPostController;
use App\Http\Controllers\ServerUserController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);

Route::middleware([AuthMiddleware::class])->group(function () {
    Route::get('portal', [PortalController::class, 'index']);

    Route::get('publikasi/tambah', [PortalController::class, 'publikasi_tambah'])->name('publikasi.tambah');
    Route::post('publikasi/save', [ServerPostController::class, 'save'])->name('publikasi.save');
    Route::post('publikasi/save-draft', [ServerPostController::class, 'save_draft'])->name('publikasi.savedraft');
    Route::post('publikasi/contributor/get', [ServerPostController::class, 'contributor_get'])->name('user.contributorget');
    Route::post('publikasi/contributor/add', [ServerPostController::class, 'contributor_add'])->name('user.contributoradd');
    Route::post('publikasi/contributor/rmv', [ServerPostController::class, 'contributor_rmv'])->name('user.contributorrmv');

    Route::post('user/search', [ServerUserController::class, 'search_users'])->name('user.search');

    Route::post('addimage', [ServerManageImage::class, 'store']);
});

Route::get('/s', [DeveloperController::class, 'session_get']);
Route::get('/f', [DeveloperController::class, 'session_flush']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
