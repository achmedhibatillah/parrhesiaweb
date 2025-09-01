<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imageupload extends Model
{
    use HasFactory;

    protected $table = 'imageupload';
    protected $primaryKey = 'imageupload_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'imageupload_id',
        'imageupload_path',
        'imageupload_description',
        'imageupload_access',
        'user_id'
    ];
}
