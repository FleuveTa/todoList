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
    /**
     * Register
     * @OA\Post (
     *     path="/api/register",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                      type="object",
     *                      @OA\Property(
     *                          property="name",
     *                          type="string"
     *                      ),
     *                      @OA\Property(
     *                          property="email",
     *                          type="string"
     *                      ),
     *                      @OA\Property(
     *                          property="password",
     *                          type="string"
     *                      ),
     *                 ),
     *                 example={
     *                     "name":"giangthunhat",
     *                     "email":"giangt1@gmail.com",
     *                     "password":"123"
     *                }
     *             )
     *         )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="success",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  type="object",
     *                  property="user",
     *                  @OA\Property(
     *                          property="id",
     *                          type="number",
     *                          example="1"
     *                      ),
     *                  @OA\Property(
     *                          property="name",
     *                          type="string",
     *                          example="gisadasdasdas"
     *                      ),
     *                  @OA\Property(
     *                          property="email",
     *                          type="string",
     *                          example="giang@gmail.com"
     *                      ),
     *                  @OA\Property(
     *                          property="created_at",
     *                          type="string",
     *                          example="2023-06-08T02:32:20.000000Z"
     *                      ),
     *                  @OA\Property(
     *                          property="updated-at",
     *                          type="string",
     *                          example="2023-06-08T02:32:20.000000Z"
     *                      ),
     *              ),
     *              @OA\Property(
     *                  type="string",
     *                  property="message",
     *                  example="Success"
     *               ),                  
     *          )
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="invalid",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Email already exist"),
     *          )
     *      )
     * )
     */
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

    /**
     * Login
     * @OA\Post (
     *     path="/api/login",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                      type="object",        
     *                      @OA\Property(
     *                          property="email",
     *                          type="string"
     *                      ),
     *                      @OA\Property(
     *                          property="password",
     *                          type="string"
     *                      ),
     *                 ),
     *                 example={
     *                     "email":"giangt1@gmail.com",
     *                     "password":"123"
     *                }
     *             )
     *         )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="success",
     *              @OA\JsonContent(
     *              @OA\Property(
     *                  type="object",
     *                  property="user",
     *                  @OA\Property(
     *                          property="id",
     *                          type="number",
     *                          example="1"
     *                      ),
     *                  @OA\Property(
     *                          property="name",
     *                          type="string",
     *                          example="giang"
     *                      ),
     *                  @OA\Property(
     *                          property="email",
     *                          type="string",
     *                          example="giang@gmail.com"
     *                      ),
     *                  @OA\Property(
     *                          property="img_url",
     *                          type="string",
     *                          example="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
     *                      ),
     *                  @OA\Property(
     *                          property="created_at",
     *                          type="string",
     *                          example="2023-06-08T02:32:20.000000Z"
     *                      ),
     *                  @OA\Property(
     *                          property="updated_at",
     *                          type="string",
     *                          example="2023-06-08T02:32:20.000000Z"
     *                      ),
     *              ),
     *              @OA\Property(
     *                  type="string",
     *                  property="message",
     *                  example="Success"
     *               ),                  
     *              @OA\Property(
     *                  type="string",
     *                  property="token",
     *                  example="47|ROiSRQZvyWKhGshMH63NpAI19mBX9o70EEh7sYP3"
     *               ),                  
     *          )
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Wrong email or password",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Wrong information"),
     *          )
     *      )
     * )
     */
    public function login(Request $request) {
       if( !Auth::attempt([
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ])) {
            return response(['message' => 'Wrong information'], Response::HTTP_UNAUTHORIZED);
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
