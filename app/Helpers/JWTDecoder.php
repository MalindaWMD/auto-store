<?php

namespace App\Helpers;

class JWTDecoder 
{
    public static function decode($token)
    {
        if( ! $token){
            return null;
        }

        $parts = explode('.', $token);

        $payload = \Arr::get($parts, 1, null);

        if(!$payload){
            return null;
        }

        return json_decode(base64_decode($payload), true);
    }
}