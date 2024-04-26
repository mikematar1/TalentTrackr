<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecruiterController extends Controller
{
    public function addListing(Request $request){
           $skillsSettings = [
        "Normalize" => true, // Enable skills normalization
    ];
        $data = ["DocumentAsBase64String" => $request->base64,"DocumentLastModified","SkillsSettings"=>$skillsSettings];
        $url = "https://api.eu.textkernel.com/tx/v10/parser/joborder";


        $curl = curl_init();
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $headers = [
        "accept: application/json",
        "content-type: application/json; charset=utf-8",
        "tx-accountid: 	47510977",
        "tx-servicekey: cQ8gzhNBmumIqeT2FvT3WQ1SZWXLQMEdt7SGuIa3"
        ];
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

        $result = curl_exec($curl);
        curl_close($curl);
        $result = json_decode($result);
        $result = $result->Value;
        $jobdata = json_encode($result->JobData);

        Listing::create([
            'job_listing_json_object'=>$jobdata,
            'matches'=>0,
            'recruiter_id'=>Auth::user()->id,
        ]);


    }
    public function deleteListing($listingid){
        Listing::find($listingid)->delete();
        return "succcess";
    }
}
