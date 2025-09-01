<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Imageupload;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ServerManageImage extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:10240',
            'imageupload_description' => 'nullable|string|max:120',
            'imageupload_access' => 'required|string',
            'user_id' => 'required|uuid',
        ]);
    
        $fileUuid = GeneratorController::generate_uuid('imageupload', 'imageupload_path');
        $dbUuid = GeneratorController::generate_uuid('imageupload', 'imageupload_id');
    
        $extension = $request->file('image')->getClientOriginalExtension();
        if (!$extension) {
            $extension = $request->file('image')->extension();
        }
        $filename = $fileUuid . '.' . $extension;
        $path = $request->file('image')->storeAs('images', $filename, 'public');        
    
        $image = Imageupload::create([
            'imageupload_id' => $dbUuid,
            'imageupload_path' => $path,
            'imageupload_description' => $request->imageupload_description,
            'imageupload_access' => $request->imageupload_access,
            'user_id' => $request->user_id,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $image
        ], 201);        
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'imageupload_id' => 'nullable|uuid',
            'imageupload_path' => 'nullable|string',
        ]);
    
        $query = Imageupload::query();
    
        if ($request->filled('imageupload_id')) {
            $query->where('imageupload_id', $request->imageupload_id);
        } elseif ($request->filled('imageupload_path')) {
            $query->where('imageupload_path', $request->imageupload_path);
        } else {
            return response()->json(['status' => 'error', 'message' => 'ID atau path harus disertakan.'], 422);
        }
    
        $image = $query->first();
    
        if (!$image) {
            return response()->json(['status' => 'error', 'message' => 'Image tidak ditemukan.'], 404);
        }
    
        if (Storage::disk('public')->exists($image->imageupload_path)) {
            Storage::disk('public')->delete($image->imageupload_path);
        }
    
        $image->delete();
    
        return response()->json(['status' => 'success']);
    }
}
