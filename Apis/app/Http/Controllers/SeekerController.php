<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Feedback;
use App\Models\Listing;
use App\Models\ListingMatchesSeeker;
use App\Models\Recruiter;
use App\Models\Resume;
use App\Models\Seeker;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class SeekerController extends Controller
{

    public function parseResume($base64Resume){

        $base64str = $base64Resume;
        $modifiedDate = "2023-03-14";
        $skillsSettings = [
            "Normalize" => true, // Enable skills normalization
        ];

        $data = ["DocumentAsBase64String" => $base64str, "DocumentLastModified" => $modifiedDate,"SkillsSettings"=>$skillsSettings];

        $url = "https://api.eu.textkernel.com/tx/v10/parser/resume";


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
        $result=$result->Value->ResumeData;
        echo("PARSING DONE");
        return $result;
    }
    public function createIndexAndResume($parsedResume,$userid){

        $indexid = Resume::count()+1;
        $url = "https://api.eu.textkernel.com/tx/v10/index/$indexid";
        $data = ["IndexType" => "Resume"];

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));

        curl_setopt($curl, CURLOPT_URL, $url);
        // curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $headers = [
        "accept: application/json",
        "content-type: application/json; charset=utf-8",
        "tx-accountid: 	47510977",
        "tx-servicekey: cQ8gzhNBmumIqeT2FvT3WQ1SZWXLQMEdt7SGuIa3"
        ];
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

        curl_exec($curl);
        curl_close($curl);

        echo("INDEXING DONE");
        $data = ["ResumeData" => $parsedResume];
        $resumeid = $indexid;
        $url = "https://api.eu.textkernel.com/tx/v10/index/$indexid/resume/$resumeid";


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
        $resume=Resume::create([
            "user_id"=>$userid
        ]);
        return $resume->id;
    }
    public function uploadResume($base64Resume,$userid){
        $parsedResume = $this->parseResume($base64Resume);
        $resumeid=$this->createIndexAndResume($parsedResume,$userid);
        return $resumeid;
    }
    public function getInformation(){
        $user = Auth::user();
        $userdetails = User::where("id","=",$user->id)
                        ->join("seekers","seekers.user_id","=","users.id")
                        ->first();
        $resume = Resume::where("user_id","=",$user->id)->first();
        $indexid = $resume->id;
        $url = "https://api.eu.textkernel.com/tx/v10/index/$indexid/resume/$indexid";


        $curl = curl_init();

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
        $result = json_decode($result);
        $result = $result->Value;
        curl_close($curl);
        $userdetails->resume = $result;
        return $userdetails;
    }

    public function editInformation(Request $request){
        $user=Auth::user();
        if($request->has("base64resume")){
            $parsedResume = $this->parseResume($request->base64resume);
            $resume = Resume::where("user_id","=",$user->id)->first();
            $indexid = $resume->id;
            $data = ["ResumeData" => $parsedResume];
            $url = "https://api.eu.textkernel.com/tx/v10/index/$indexid/resume/$indexid";


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

            curl_exec($curl);
            curl_close($curl);
        }
        if($request->has("password")){
            $userchangeable = User::where("id","=",$user->id)->first();
            $userchangeable->password = Hash::make($request->password);
            $userchangeable->save();
        }
    }
    public function addFeedback(Request $request){
        $user = Auth::user();
        $feedback =Feedback::create([
            "user_id"=>$user->id,
            "review"=>$request->review
        ]);
        return $feedback;
    }
    public function getMatches(){
        $user=Auth::user();
        $matches=ListingMatchesSeeker::where("seeker_id","=",$user->id)->join("listings","listings.id","=","listing_matches_seekers.listing_id")->get();
        foreach($matches as $match){
            $match->listing_details = json_decode($match->job_listing_json_object);
            $recruiter = Recruiter::find($match->recruiter_id);
            $company = Company::find($recruiter->company_id);
            $match->company_details = $company;

            $listings = Listing::where("recruiter_id","=",$match->recruiter_id)->get();
            foreach($listings as $listing){
                $listing_details=json_decode($listing->job_listing_json_object);
                $listing->listing_details=$listing_details;
                $matches=ListingMatchesSeeker::where("listing_id","=",$listing->id)
                                            ->join("users","users.id","=","listing_matches_seekers.seeker_id")
                                            ->join("seekers","seekers.user_id","=","listing_matches_seekers.seeker_id")
                                            ->get();
                $listing->matches = $matches;
                $recruiter=Recruiter::find($match->recruiter_id);
                $company = Company::find($recruiter->company_id);
                $listing->company_details=$company;

            }

            $match->company_listings = $listings;
        }
        return $matches;
    }
    public function getindeces(Request $request){

        $url = "https://api.eu.textkernel.com/tx/v10/index";


        $curl = curl_init();

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
        return $result;



    }



}
