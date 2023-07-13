<?php

namespace App\Http\Controllers;

use App\Http\Resources\FrontendUserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if( ! auth()->check()){
            return $this->fail('No auth user', 404);
        }
        
        return $this->success(new FrontendUserResource(auth()->user()));
    }
}
