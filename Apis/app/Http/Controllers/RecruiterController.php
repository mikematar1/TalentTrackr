<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Listing;
use App\Models\Recruiter;
use App\Models\Resume;
use App\Models\User;
use Google\Cloud\Storage\StorageClient;
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
        $result = $result->JobData;
        if (str_contains($result->EmployerDescription, "{") || str_contains($result->EmployerDescription, "}") ||
            str_contains($result->JobRequirements, "{") || str_contains($result->JobRequirements, "}")) {
                return response()->json([
                    'status' => 'FAIL',
                    'message' => "The template is not fully editted"

                ]);
        } else {
            $jobdata = json_encode($result);

            $listing=Listing::create([
                'job_listing_json_object'=>$jobdata,
                'matches'=>0,
                'recruiter_id'=>Auth::user()->id,
            ]);
            return response()->json([
                'status' => 'success',
                'listing' => $listing

            ]);
        }




    }
    public function deleteListing($listingid){
        Listing::find($listingid)->delete();
        return "succcess";
    }
    public function getInformation(){
        $user = Auth::user();
        $userdetails = User::where("users.id", "=", $user->id)
                        ->join("recruiters", "recruiters.user_id", "=", "users.id")
                        ->join("companies", "companies.id", "=", "recruiters.company_id")
                        ->first();
        return $userdetails;
    }
    public function editInformation(Request $request){
        $user = Auth::user();
        $recruiter = Recruiter::where("user_id","=",$user->id)->first();
        $company = Company::where("id","=",$recruiter->company_id)->first();
        if($request->has("logo_base64")){
            $storage = new StorageClient([
                'projectId' => 'urban-boutique-hotel',
                    'keyFilePath' => 'C:\Users\miche\Downloads\Capstone Project\TalentTrackr\Apis\talentrackr-399fc-firebase-adminsdk-s7e1o-4cee66f79d.json'
            ]);
            $bucket = $storage->bucket('talentrackr-399fc.appspot.com');

            $base64image = $request->logo_base64;
            $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64image));
            $filename = $request->company_name . '.png';
            $foldername = "Businesslogo/";
            $object = $bucket->upload($imageData, [
                'name' => $foldername.$filename
            ]);
            $url = $object->signedUrl(new \DateTime('+100 years'));


            $company_url = $company->logo_url;
            if (preg_match('/([\w]+.(png|jpg|jpeg|gif))/', $url, $matches)) {
                $filename = $matches[1];
                $overallpath = $foldername.$filename;
                $object = $bucket->object($overallpath);
                $object->delete();

            }
            $company->logo_url = $url;
            $company->save();


        }
    }
}
