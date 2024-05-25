<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\ScientificData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ScientificDataController extends Controller
{
    public function index(Request $request)
    {
        $query = ScientificData::query();
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'LIKE', "%{$search}%")
                ->orWhere('description', 'LIKE', "%{$search}%")
                ->orWhere('visibility', 'LIKE', "%{$search}%");
        }
        $data = $query->get();
        return ApiResponse::success($data, 'Data retrieved successfully');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'file' => 'nullable|mimes:jpeg,png,jpg,pdf,xlsx|max:2048',
            'visibility' => 'required|in:public,private',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filePath = $file->store('scientific_files', 'public');
            $validatedData['file_path'] = $filePath;
        }

        $scientificData = ScientificData::create($validatedData);
        return ApiResponse::success($scientificData, 'Data created successfully', 201);
    }

    public function show($id)
    {
        $scientificData = ScientificData::findOrFail($id);
        return ApiResponse::success($scientificData, 'Data retrieved successfully');
    }

    public function update(Request $request, $id)
    {
        $scientificData = ScientificData::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'file' => 'nullable|mimes:jpeg,png,jpg,pdf,xlsx|max:2048',
            'visibility' => 'sometimes|required|in:public,private',
        ]);
        if ($request->hasFile('file')) {
            // Delete the old file if exists
            if ($scientificData->file_path) {
                Storage::disk('public')->delete($scientificData->file_path);
            }

            $file = $request->file('file');
            $filePath = $file->store('scientific_files', 'public');
            $validatedData['file_path'] = $filePath;
        }

        $scientificData->update($validatedData);
        return ApiResponse::success($scientificData, 'Data updated successfully');
    }

    public function destroy($id)
    {
        $scientificData = ScientificData::findOrFail($id);

        if ($scientificData->file_path) {
            Storage::disk('public')->delete($scientificData->file_path);
        }

        $scientificData->delete();
        return ApiResponse::success(null, 'Data deleted successfully');
    }
}
