<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validasi masukan
        $request->validate([
            'username' => 'required|min:3|max:25',
            'password' => 'required|min:8|max:255'
        ]);

        // Cek username dan password
        $credentials = $request->only('username', 'password');

        // Verifikasi kredensial
        if (Auth::attempt($credentials)) {
            $user = $request->user();
            $token = $user->createToken('AuthToken')->plainTextToken;
            return response()->json([
                'token' => $token,
                'user' => $user
            ], 200);
        } else {
            return response()->json(['error' => 'Tidak Terotorisasi'], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Berhasil Keluar'], 200);
    }
}
