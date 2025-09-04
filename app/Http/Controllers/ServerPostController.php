<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\UserToPost;
use Illuminate\Http\Request;

use function Laravel\Prompts\error;

class ServerPostController extends Controller
{
    public function save(Request $request)
    {
        try {
            Post::where('post_id', $request->post_id)->update([
                'post_status' => 'queue'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
            ]);
        }

        return response()->json([
            'status' => 'success',
        ]);
    }

    public function save_draft(Request $request)
    {
        $post = Post::updateOrCreate(
            ['post_id' => $request->post_id],
            [
                'post_slug' => $request->post_slug,
                'post_title' => $request->post_title,
                'post_description' => $request->post_description,
                'post_content' => $request->post_content,
                'post_status' => 'draft',
                'postcategory_id' => $request->postcategory_id,
            ]
        );
    
        return response()->json([
            'status' => 'success',
            'post_id' => $post->post_id
        ]);
    }
    
    public function contributor_add(Request $request)
    {
        if (!User::where('user_id', $request->user_id)->exists()) {
            return response()->json([
                'status' => 'error'
            ]);
        }

        if (UserToPost::where('user_id', $request->user_id)->where('post_id', $request->post_id)->exists()) {
            return response()->json([
                'status' => 'danger'
            ]);
        }


        UserToPost::create([
            'relation_id' => GeneratorController::generate_uuid('user_to_post', 'relation_id'),
            'relation_role' => 'Penulis',
            'user_id' => $request->user_id,
            'post_id' => $request->post_id
        ]);

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function contributor_rmv(Request $request)
    {
        if (!User::where('user_id', $request->user_id)->exists() || !Post::where('post_id', $request->post_id)->exists()) {
            return response()->json([
                'status' => 'error'
            ]);
        }

        if (UserToPost::where('user_id', $request->user_id)->where('post_id', $request->post_id)->relation_initiator == 1) {
            return response()->json([
                'status' => 'error'
            ]);
        }

        UserToPost::where('user_id', $request->user_id)->where('post_id', $request->post_id)->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function contributor_get(Request $request)
    {
        $validated = $request->validate([
            'post_id' => 'required|uuid|exists:post,post_id',
        ]);
    
        return UserToPost::get_contributor($validated['post_id']);
    }    
}
