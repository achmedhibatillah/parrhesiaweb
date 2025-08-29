<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\GeneratorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Mail\RegistrationOtpMail;
use App\Models\User;
use App\Models\UserRegistration;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $email = null;

        if ($request->has('email')) {
            $email = $request->email;
        }

        return Inertia::render('auth/login', [
            'email' => $email
        ]);
    }

    public function register()
    {
        return Inertia::render('auth/register');
    }

    public function register_email(Request $request)
    {
        $request->validate([
            'user_email' => 'required|email',
        ]);

        // Cek apakah email terdaftar
        if (User::where('user_email', $request->user_email)->exists()) {
            return response()->json([
                'status' => 'error-email',
            ]);
        }

        // Cek apakah sudah 5 menit?
        if (UserRegistration::where('userregistration_email', $request->user_email)->exists()) {
            $userregistration = UserRegistration::where('userregistration_email', $request->user_email)->first();
            $otpExpireTime = Carbon::parse($userregistration->created_at)->addMinutes(5);
            if ($otpExpireTime->isFuture()) {
                return response()->json([
                    'status' => 'danger',
                    'created_at' => $userregistration->created_at
                ]);
            }

            $userregistration->delete();
        }
        

        $userregistration_id = GeneratorController::generate_uuid('userregistration', 'userregistration_id');
        $userregistration_otp = GeneratorController::generate_otp('userregistration', 'userregistration_otp');

        $userregistration = UserRegistration::create([
            'userregistration_id' => $userregistration_id,
            'userregistration_email' => $request->user_email,
            'userregistration_otp' => $userregistration_otp,
            'created_at' => now()
        ]);

        Mail::to($request->user_email)->send(new RegistrationOtpMail($userregistration_otp));

        return response()->json([
            'status' => 'success',
            'created_at' => $userregistration->created_at
        ]);
    }

    public function login_process(Request $request)
    {
        $request->validate([
            'user_email' => 'required',
            'user_pass' => 'required'
        ]);

        if (!User::where('user_email', $request->user_email)->exists()) {
            return response()->json([
                'status' => 'error'
            ]);
        }

        $user = User::where('user_email', $request->user_email)->first();

        if (Hash::check($request->user_pass, $user->user_pass)) {
            session([
                'sss' => 'usr',
                'usr' => $user->user_id,
                'acs' => $user->role_id
            ]);

            return response()->json([
                'status' => 'success'
            ]);
        }

        return response()->json([
            'status' => 'error'
        ]);
    }
 
    public function register_otp(Request $request)
    {
        $request->validate([
            'user_email' => 'required',
            'user_otp' => 'required'
        ]);

        if (!UserRegistration::where('userregistration_email', $request->user_email)->exists()) {
            return response()->json([
                'status' => 'error-email'
            ]);
        }

        $userregistration = UserRegistration::where('userregistration_email', $request->user_email)->first();

        $otpExpireTime = Carbon::parse($userregistration->created_at)->addMinutes(5);
        if (!$otpExpireTime->isFuture()) {
            return response()->json([
                'status' => 'error-expired'
            ]);
        }

        if ((string)$request->user_otp !== (string)$userregistration->userregistration_otp) {
            if ($userregistration->userregistration_chance == 4) {
                $userregistration->update([
                    'userregistration_chance' => 3
                ]);
                return response()->json([
                    'status' => 'danger-3'
                ]);
            } else if ($userregistration->userregistration_chance == 3) {
                $userregistration->update([
                    'userregistration_chance' => 2
                ]);
                return response()->json([
                    'status' => 'danger-2'
                ]);
            } else if ($userregistration->userregistration_chance == 2) {
                $userregistration->update([
                    'userregistration_chance' => 1
                ]);
                return response()->json([
                    'status' => 'danger-1'
                ]);
            } else  if ($userregistration->userregistration_chance == 1){
                $userregistration->update([
                    'userregistration_chance' => 0
                ]);
                return response()->json([
                    'status' => 'error-end'
                ]);
            }
        }

        if ($userregistration->userregistration_chance == 0){
            return response()->json([
                'status' => 'error-trial'
            ]);
        }

        UserRegistration::where('userregistration_email', $request->user_email)->update([
            'userregistration_passed' => true
        ]);

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function register_complete(Request $request)
    {
        $request->validate([
            'user_email' => 'required|email|max:320',
            
            'user_fullname' => [
                'required',
                'max:64',
                function($attribute, $value, $fail) {
                    if (!preg_match('/^[a-zA-Z][a-zA-Z\s,.-]*$/', $value)) {
                        $fail('Nama lengkap harus diawali huruf dan hanya boleh huruf, spasi, koma, titik, atau tanda strip.');
                    }
                },
            ],
    
            'user_username' => [
                'required',
                'min:7',
                'max:21',
                function($attribute, $value, $fail) {
                    if (!preg_match('/^[a-zA-Z][a-zA-Z0-9-_.]*$/', $value)) {
                        $fail('Username harus diawali huruf dan hanya boleh huruf, angka, "-", "_", atau "."');
                    }
                },
            ],
    
            'user_password' => [
                'required',
                'min:8',
                'max:40',
                function($attribute, $value, $fail) {
                    if (!preg_match('/[A-Z]/', $value)) {
                        $fail('Password harus mengandung huruf besar.');
                    }
                    if (!preg_match('/[a-z]/', $value)) {
                        $fail('Password harus mengandung huruf kecil.');
                    }
                    if (!preg_match('/[0-9]/', $value)) {
                        $fail('Password harus mengandung angka.');
                    }
                    if (!preg_match('/[^a-zA-Z0-9]/', $value)) {
                        $fail('Password harus mengandung karakter khusus.');
                    }
                },
            ],
        ]);

        // Cek apakah email terdaftar
        if (User::where('user_email', $request->user_email)->exists()) {
            return response()->json([
                'status' => 'error',
            ]);
        }

        $user_id = GeneratorController::generate_uuid('user', 'user_id');

        User::create([
            'user_id' => $user_id,
            'user_email' => $request->user_email,
            'user_username' => $request->user_username,
            'user_fullname' => $request->user_fullname,
            'user_pass' => Hash::make($request->user_password),
            'role_id' => 'guest-user'
        ]);

        UserRegistration::where('userregistration_email', $request->user_email)->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function register_check_username(Request $request)
    {
        $exists = User::where('user_username', $request->username);

        if (!$exists) {
            return response()->json([
                'status' => 'not-available'
            ]);
        }

        return response()->json([
            'status' => 'available'
        ]);
    }
}
