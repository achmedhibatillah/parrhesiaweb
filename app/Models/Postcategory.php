<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Postcategory extends Model
{
    use HasFactory;

    protected $table = 'postcategory';
    protected $primaryKey = 'postcategory_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'postcategory_id',
        'postcategory_slug',
        'postcategory_name',
        'postcategory_status',
        'postcategory_img'
    ];
}
