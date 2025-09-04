<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'user';
    protected $primaryKey = 'user_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'user_email',
        'user_username',
        'user_fullname',
        'user_pass',
        'role_id',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function detail()
    {
        return $this->hasOne(UserDt::class, 'user_id', 'user_id');
    }

    public function posts()
    {
        return $this->belongsToMany(Post::class, 'user_to_post', 'user_id', 'post_id');
    }
}
