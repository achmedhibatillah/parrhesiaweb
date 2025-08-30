<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDt extends Model
{
    use HasFactory;

    protected $table = 'userdt';
    protected $primaryKey = 'user_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'user_phone',
        'userdt_headline',
        'userdt_description',
        'userdt_website',
        'userdt_instagram',
        'userdt_tiktok',
        'userdt_facebook',
        'userdt_linkedin',
        'userdt_github',
        'userdt_email',
        'userdt_scopus',
        'userdt_scholar',
        'userdt_orcid',
        'userdt_sinta',
        'userdt_pp',
        'userdt_bg',
    ];
}
