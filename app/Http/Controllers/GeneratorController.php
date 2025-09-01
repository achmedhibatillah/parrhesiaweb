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

    public static function simple_num($num) {
        if ($num === 0) {
            return "-";
        } elseif ($num > 0 && $num < 100) {
            return (string)$num;
        } elseif ($num >= 100 && $num < 1000) {
            return $num; // tetap angka
        } elseif ($num >= 1000 && $num < 10000) {
            $formatted = round($num / 1000, 1); // 1,2 rb
            return rtrim($formatted, '.0') . ' rb';
        } elseif ($num >= 10000 && $num < 100000) {
            $formatted = round($num / 1000, 0); // 10 rb, 20 rb
            return $formatted . ' rb';
        } elseif ($num >= 100000 && $num < 1000000) {
            $formatted = round($num / 100000, 1) * 100; // 100 rb, 110 rb, 1,2 jt
            if ($num >= 1000000) {
                return '>10 jt';
            } elseif ($num >= 1000000) {
                return '>10 jt';
            } elseif ($num >= 1000000) {
                return '>10 jt';
            } elseif ($num >= 100000) {
                $formatted = round($num / 100000, 1) * 100;
                return ($formatted >= 1000 ? round($num / 1000000, 1) . ' jt' : $formatted . ' rb');
            }
        } elseif ($num >= 1000000) {
            return '>10 jt';
        }
    
        return (string)$num; // fallback
    }
}
