<?php

namespace App\Console\Commands;

use App\Models\Listing;
use App\Models\ListingMatchesSeeker;
use App\Models\Resume;
use App\Models\Seeker;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class CheckMatches extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-matches';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for matches between listings and resumes';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            // Code that may throw an exception
            $indeces=Resume::pluck('id')->toArray();
            $listings = Listing::all();
            foreach ($listings as $listing) {

                $jobdata = json_decode($listing->job_listing_json_object);
                $seeker_ids=ListingMatchesSeeker::where("listing_id","=",$listing->id)->select("seeker_id")->get();
                $resume_ids=[]; //these are the resumes that this listing has already matched with
                foreach($seeker_ids as $x){
                    $resumeid = Resume::where("user_id","=",$x->seeker_id)->first();
                    $resumeid = $resumeid->id;
                    $resume_ids[] = $resumeid;
                }
                $indeces_to_search=array_diff($indeces,$resume_ids);
                echo(json_encode($indeces_to_search));
                if(!empty($indeces_to_search)){
                    $data = ["JobData" => $jobdata,"IndexIdsToSearchInto"=>$indeces_to_search];

                    $url = "https://api.eu.textkernel.com/tx/v10/matcher/joborder";


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
                    $result=json_decode($result);
                    $result = $result->Value;
                    foreach($result->Matches as $match){
                        $resume = Resume::find($match->IndexId);
                        if(ListingMatchesSeeker::where("listing_id","=",$listing->id)->where("seeker_id","=",$resume->user_id)->exists()){
                            echo("match found");
                        }else{
                            $resume = Resume::find($match->IndexId);
                            ListingMatchesSeeker::create([
                                "listing_id"=>$listing->id,
                                "seeker_id"=>$resume->user_id,
                                "match_percentage"=>$match->WeightedScore
                            ]);
                        }

                    }
                }

            }
        } catch (\Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            echo("a");
        }

    }
}
