<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(Request $request) {
        $input['email'] = $request->input('email');
        $rule = array('email' => 'unique:users,email');
        $validator = Validator::make($input, $rule);

        if ($validator->fails()) {
            return response([
                'message' => 'Email Already exist'
            ]);
        }

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ]);

        return response([
            'message' => 'Register successfully',
            'user' => $user
        ]);

    }

    public function login(Request $request) {
       if( !Auth::attempt([
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ])) {
            return response(['message' => 'You little shit'], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        $token = $user->createToken('token')->plainTextToken;

        $cookie = cookie('token', $token, 60*10, null, null, true);

        return response()->json([
            'message' => 'success',
            'token' => $token,
            'user' => $user
        ])->withCookie($cookie);
    }

    public function user() {
        return Auth::user();
    }

    public function logout (Request $request) {
        $cookie = Cookie::forget('token');
        return response([
            'message' => 'Logout successfully'
        ])->withCookie($cookie);
    }
}
