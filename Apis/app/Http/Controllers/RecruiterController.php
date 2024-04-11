<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecruiterController extends Controller
{
    public function addListing(Request $request){
        $request->validate([
            'position_name' => 'required|string',
            'position_description' => 'required|string',

        ]);
        Listing::create([
            'position_name'=>$request->position_name,
            'position_description'=>$request->position_description,
            'required_skills'=>$request->required_skills,
            'matches'=>0,
            'recruiter_id'=>Auth::user()->id,
        ]);


    }
}
