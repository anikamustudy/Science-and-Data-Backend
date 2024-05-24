<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Api\V1\BaseController as BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseController
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',

        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation Error.', $validator->errors());
        }
        $data = $request->all();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        $success['token'] = $user->createToken('Science&Data')->plainTextToken;
        $success['name'] = $user->name;

        return $this->successResponse($success, 'User register successfully.');
    }

    public function login()
    {
        return response()->json(['message' => 'Hello Login']);
    }

    public function logout()
    {
        return response()->json(['message' => 'Hello Logout']);
    }
}
