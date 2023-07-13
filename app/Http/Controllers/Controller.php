<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public static function success($data)
    {
        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public static function fail($errors, $status=500, $type='generic')
    {
        return response()->json([
            'success' => false,
            'type' => $type,
            'error' => $errors,
        ], $status);
    }
}
