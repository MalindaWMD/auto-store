<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public static function success($data, $paginated=false)
    {
        $responseData = [
            'success' => true,
            'data' => $data,
        ];

        if($paginated){
            $responseData['pagination'] = self::getPagination($data);
        }

        return response()->json($responseData);
    }

    public static function fail($errors, $status=500, $type='generic')
    {
        return response()->json([
            'success' => false,
            'type' => $type,
            'error' => $errors,
        ], $status);
    }

    private static function getPagination($data)
    {
        if($data){
            return [
                'current_page' => $data->currentPage(),
                'has_pages' => $data->hasPages(),
                'has_more' => $data->hasMorePages(),
            ];
        }

        return [];
    }
}
