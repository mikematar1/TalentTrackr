<?php

namespace App\Http\Controllers;

use App\Models\Listing;
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
        }
        return $listings;
    }

}
