<?php

namespace App\Console\Commands;

use App\Models\Listing;
use App\Models\ListingMatchesSeeker;
use App\Models\Resume;
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

                $jobdata = [
                    "JobTitle"=>$listing->position_name,
                    "JobDescription"=>$listing->position_description,
                    "Skills"=>explode("//",$listing->required_skills),

                ];

                $data = ["JobData" => $jobdata,"IndexIdsToSearchInto"=>$indeces];

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
                echo(count($result->Matches));
                foreach($result->Matches as $match){

                    ListingMatchesSeeker::create([
                        "listing_id"=>$listing->id,
                        "seeker_id"=>$match->IndexId,
                        "match_percentage"=>$match->SovScore
                    ]);
                }
            }
        } catch (\Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            echo("a");
        }

    }
}
