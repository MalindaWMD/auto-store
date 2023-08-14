<?php

namespace App\Http\Controllers;

use App\Http\Resources\FrontendUserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if (!auth()->check()) {
            return $this->fail('No auth user', 404);
        }

        return $this->success(new FrontendUserResource(auth()->user()));
    }

    public function update(Request $request)
    {        
        if (!auth()->check()) {
            return $this->fail('Unauthenticated', 401);
        }

        $request->validate($this->getRules($request));

        try {
            $user = auth()->user();

            $user->name = $request->name;

            if ($request->password) {
                $user->password = bcrypt($request->password);
            }

            $user->save();

            return $this->success(new FrontendUserResource($user));
        } catch (\Exception $e) {
            \Log::error('UserController(update): Error updating profile. ' . json_encode($e->getMessage(), $e->getLine(), $e->getFile()));
        }

        return $this->fail('Error updating profile information', 500);
    }

    private function getRules($request)
    {
        $rules = [
            'name' => 'required',
        ];

        if ($request->get('password')) {
            $rules['password'] = [
                'required',
                'string',
                'min:6',
                'regex:/[a-z]/',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*#?&]/',
                'confirmed',
            ];
        }

        return $rules;
    }
}