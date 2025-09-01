<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Postscore extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'postscore';
    protected $primaryKey = 'postscore_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'postscore_rate',
        'postscore_content',
        'post_id',
        'user_id',
    ];

}
