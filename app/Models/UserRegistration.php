<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRegistration extends Model
{
    use HasFactory;

    protected $table = 'userregistration';
    protected $primaryKey = 'userregistration_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'userregistration_id',
        'userregistration_email',
        'userregistration_otp',
        'userregistration_chance',
        'userregistration_passed',
        'created_at',
    ];
}
