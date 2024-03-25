<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recruiter extends Model
{
    use HasFactory;
    protected $primaryKey = 'user_id';
    protected $fillable = [
        'company_id',
        'user_id',
    ];
}
