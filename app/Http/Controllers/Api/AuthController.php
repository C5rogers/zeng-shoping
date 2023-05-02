<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRegisterRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(UserRegisterRequest $request){
        $fild=$request->validated();

        // dd($request['image']);

        if($request->hasFile('image')){
            $request->validate([
            'image'=>['file','mimes:png,jpg,gif,jpeg','max:2048']
            ]);
            $image=$request->file('image')->store('users','public');
            $image=asset('storage/'.$image);
            $fild['profile']=$image;
        }
        $fild['password']=bcrypt($fild['password']);
        $fild['authority']="user";
        $user=User::create($fild);
        $token=$user->createToken('token-name', ['server:update'])->plainTextToken;
        $response=[
            'user'=>$user,
            'token'=>$token
        ];

        return response($response,201);
    }
    

    public function login(Request $request){
        $fild=$request->validate([
            'email'=>['required','email'],
            'password'=>['required','string']
        ]);

        $user=User::where('email',$fild['email'])->first();

        if(!$user || !Hash::check($fild['password'],$user->password)){
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        $token=$user->createToken('token-name', ['server:update'])->plainTextToken;


        $response=[
            'user'=>$user,
            'token'=>$token
        ];

        return response($response,201);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return [
            'message'=>'Loged Out!'
        ];
    }

    public function getUser(Request $request){
        return response()->json($request->user());
    }

}
