<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ServerUserController extends Controller
{
    public function search_users(Request $request)
    {
        $excludedIds = [
            'guest-trash-data',
            'verified-trash-data',
        ];
    
        if (session()->has('sss')) {
            $excludedIds[] = session('sss.usr');
        }
    
        $users = User::where(function ($query) use ($request) {
                $query->where('user_username', 'like', "%{$request->keyword}%")
                      ->orWhere('user_fullname', 'like', "%{$request->keyword}%");
            })
            ->whereNotIn('user_id', $excludedIds)
            ->with('detail')
            ->take(5)
            ->get();

        foreach($users as $x) {
            if ($x->role_id == "member-user" || $x->role_id == "admin-user") {
                $x->role_id = "verified-user";
            }
        }
    
        return response()->json([
            'status' => 'success',
            'users' => $users
        ]);
    }
}
