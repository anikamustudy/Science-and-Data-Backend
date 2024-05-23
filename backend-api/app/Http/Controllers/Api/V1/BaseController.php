<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    public function successResponse($result, $message)
    {
        $response = [
            'success' => true,
            'message' => $message,
            'data' => $result,
        ];
        return response()->json($response, 200);
    }

    public function errorResponse($error, $erroMessages = [], $statusCode = 404)
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];
        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }
        return response()->json($response, $statusCode);
    }
}
