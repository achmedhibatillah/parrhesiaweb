<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserToPost extends Model
{
    use HasFactory;

    protected $table = 'user_to_post';
    protected $primaryKey = 'relation_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'relation_id',
        'relation_role',
        'relation_isinitiator',
        'relation_acc',
        'user_id',
        'post_id',
    ];

    public static function get_contributor($post_id) {
        $contributordata = UserToPost::query()
            ->where('user_to_post.post_id', $post_id)
            ->join('user', 'user.user_id', '=', 'user_to_post.user_id')
            ->leftJoin('userdt', 'userdt.user_id', '=', 'user.user_id')
            ->select(
                'user_to_post.relation_role',
                'user_to_post.relation_isinitiator',
                'user.user_id',
                'user.user_username',
                'user.user_fullname',
                'user.role_id',
                'userdt.userdt_pp'
            )
            ->get();
        return $contributordata;
    }
}
