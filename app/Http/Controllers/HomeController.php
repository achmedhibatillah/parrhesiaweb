<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('index', [
            'page' => 'home'
        ]);
    }

    // public function transaksi()
    // {
    //     return view('transaksi');
    // }
}
