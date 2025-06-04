<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request){

        $credential = $request->validate([
            'email'=>'required',
            'password'=>'required'
        ]);

        if(!Auth::attempt($credential)){
            abort(404);
        }
        $user = Auth::user();
        if(!user){
            return response()->json(['message'=>'User not found']);
        }
        $token = $user->createToken('api-toke')->PlainTextToken();

        $response = [
            'user'=>[
                'id'=>$user->id,
                'name'=>$user -> name
            ],
            'token'=>$token
        ];
        return response()->json($response,200);
    }

    public function logout(Request $request){
        $request->user->tokens()->delete();
        return response()->json(['message'=>'Logout successful']);
    }
}
