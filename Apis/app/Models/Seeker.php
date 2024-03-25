<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seeker extends Model
{
    use HasFactory;
    protected $primaryKey = 'user_id';
    protected $fillable = [
        'dob',
        'looking_for',
        'resume',
        'skills',
        'linkedin',
        'user_id'
    ];
}
