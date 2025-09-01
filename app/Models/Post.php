<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'post';
    protected $primaryKey = 'post_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'post_slug',
        'post_title',
        'post_description',
        'post_content',
        'postcategory_id',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_to_post', 'post_id', 'user_id');
    }

    public function scores()
    {
        return $this->hasMany(Postscore::class, 'post_id', 'post_id');
    }
}
