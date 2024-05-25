<?php

namespace App\Helpers;

class ApiResponse
{
    public static function success($data, $message = null, $code = 200)
    {
        return response()->json(
            [
                'status' => 'success',
                'message' => $message,
                'data' => $data,
            ], $code);
    }

    public static function error($message, $code)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], $code);
    }

}
