<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;
use Laravel\Fortify\Fortify;

use Laravel\Fortify\Http\Responses\RegisterResponse as LaravelRegisterResponse;

class RegisterResponse extends LaravelRegisterResponse
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => auth()->user(),
            ], 200);
        }

        return redirect()->intended(Fortify::redirects('register'));
    }
}
