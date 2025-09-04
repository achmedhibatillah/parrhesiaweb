<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Postcategory;
use App\Models\Postscore;
use App\Models\User;
use App\Models\UserDt;
use App\Models\UserToPost;
use Generator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortalController extends Controller
{
    protected $userdata;

    public function __construct()
    {
        $user = User::where('user_id', session('sss.usr'))->first();
        $userdt = UserDt::where('user_id', session('sss.usr'))->first();

        $post_count = GeneratorController::simple_num($user->posts()->count());
        $posts = $user->posts()->get();
        $score_rate = Postscore::whereIn('post_id', $posts->pluck('post_id'))->avg('postscore_rate') ?? "-"; 

        $this->userdata = [
            'user_id' => $user->user_id,
            'username' => $user->user_username,
            'fullname' => $user->user_fullname,
            'role' => $user->role_id,
            'pp' => $userdt->userdt_pp,
            'bg' => $userdt->userdt_bg,
            'post_count' => $post_count,
            'score_rate' => $score_rate
        ];
    }

    public function index()
    {
        return Inertia::render('portal/index', [
            'pagenow' => 'general',
            'userdata' => $this->userdata
        ]);
    }

    public function publikasi_tambah(Request $request)
    {
        if (!$request->has('id')) {
            $post_id = GeneratorController::generate_uuid('post', 'post_id');
            $relation_id = GeneratorController::generate_uuid('user_to_post', 'relation_id');
            Post::create([
                'post_id' => $post_id
            ]);
            UserToPost::create([
                'relation_id' => $relation_id,
                'relation_role' => 'Penulis',
                'relation_isinitiator' => true,
                'relation_acc' => true,
                'user_id' => $this->userdata['user_id'],
                'post_id' => $post_id
            ]);

            return redirect()->route('publikasi.tambah', ['id' => $post_id]);
        }

        if (!Post::where('post_id', $request->id)->exists()) {
            abort(404);
        }        

        $postdata = Post::where('post_id', $request->id)->first();

        return Inertia::render('portal/publikasi-tambah', [
            'pagenow' => 'publikasi.tambah',
            'userdata' => $this->userdata,
            'postcategory' => Postcategory::orderBy('postcategory_id')->get(),
            'postdata' => $postdata,
        ]);
    }
}
