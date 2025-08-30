<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DeveloperController extends Controller
{
    public function session_get()
    {
        return session()->all();
    }

    public function session_flush()
    {
        session()->flush();
        return session()->all();
    }
}
