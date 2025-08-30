<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserDt;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortalController extends Controller
{
    protected $userdata;

    public function __construct()
    {
        $user = User::where('user_id', session('sss.usr'))->first();
        $userdt = UserDt::where('user_id', session('sss.usr'))->first();

        $this->userdata = [
            'username' => $user->user_username,
            'fullname' => $user->user_fullname,
            'role' => $user->role_id,
            'pp' => $userdt->userdt_pp,
            'bg' => $userdt->userdt_bg
        ];
    }
    public function index()
    {
        return Inertia::render('portal/index', [
            'userdata' => $this->userdata
        ]);
    }
}
