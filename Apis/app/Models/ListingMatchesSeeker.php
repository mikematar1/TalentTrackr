<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListingMatchesSeeker extends Model
{
    use HasFactory;
    protected $fillable =["listing_id","seeker_id","match_percentage"];
}
