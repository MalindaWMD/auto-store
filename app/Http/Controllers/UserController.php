<?php

namespace App\Http\Controllers;

use App\Http\Resources\FrontendUserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return $this->success(new FrontendUserResource(auth()->user()));
    }
}
