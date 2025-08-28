<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class GeneratorController extends Controller
{
    public static function generate_uuid($table, $column)
    {
        do {
            $uuid = (string) Str::uuid();
        } while (DB::table($table)->where($column, $uuid)->exists());
    
        return $uuid;
    }

    public static function generate_otp($table, $column)
    {
        do {
            $otp = rand(100000, 999999);
        } while (DB::table($table)->where($column, $otp)->exists());
    
        return $otp;
    }
}
