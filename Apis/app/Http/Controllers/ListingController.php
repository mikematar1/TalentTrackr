<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Listing;
use App\Models\ListingMatchesSeeker;
use App\Models\Recruiter;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    public function getListings(){
        $listings = Listing::all();
        foreach($listings as $listing){
            $listing_details=json_decode($listing->job_listing_json_object);
            $listing->listing_details=$listing_details;
        }
        return $listings;
    }
    public function getRecruiterListings($recruiterid){
        $listings = Listing::where("recruiter_id","=",$recruiterid)->get();
        foreach($listings as $listing){
            $listing_details=json_decode($listing->job_listing_json_object);
            $listing->listing_details=$listing_details;
            $matches=ListingMatchesSeeker::where("listing_id","=",$listing->id)
                                        ->join("users","users.id","=","listing_matches_seekers.seeker_id")
                                        ->join("seekers","seekers.user_id","=","listing_matches_seekers.seeker_id")
                                        ->get();
            $listing->matches = $matches;

        }
        $recruiter=Recruiter::find($recruiterid);
        $company = Company::find($recruiter->company_id);
        $listings->company_details=$company;
        return $listings;
    }

}
