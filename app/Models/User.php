<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

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
}
