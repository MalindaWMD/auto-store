<?php

namespace App\Http\Controllers;

use App\Helpers\JWTDecoder;
use App\Models\User;
use Illuminate\Http\Request;

class GoogleLoginController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'creds' => 'required',
        ]);

        if( ! config('google.client_id')){
            \Log::debug('GoogleLoginController(store): Google client is not configured');
            return $this->fail('Can\'t authenticate');
        }

        $client = new \Google_Client(['client_id' => config('google.client_id')]);
        $payload = $client->verifyIdToken($request->creds);

        if( ! $payload){
            return $this->fail('Authentication failed. Please try again!');
        }

        $user = User::where('email', $payload['email'])->where('auth_type', User::AUTH_TYPE_GOOGLE)->first();

        if( ! $user){
            $user = User::create([
                'email' => $payload['email'],
                'password' => bcrypt($payload['email']),
                'name' => $payload['name'],
                'auth_type' => User::AUTH_TYPE_GOOGLE,
            ]);

            $user->customers()->create([
                'first_name' => $payload['name'],
                'last_name' => '',                
            ]);
        }

        // Check for user auth type
        // if( $user->auth_type !== User::AUTH_TYPE_GOOGLE){
        //     return $this->fail('We could not find any user registered with un using Google login. Please try with other options.');
        // }

        \Auth::loginUsingId($user->id);

        return $this->success(\Auth::user());
    }
}
