<?php

namespace App\Http\Controllers;

use App\Models\Recruiter;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getUnverifiedRecruiters(){

        $recruiters = Recruiter::where("verified","=",false)->join("users","users.id","=","recruiters.user_id")
                                ->join("companies","companies.id","recruiters.company_id")->get();
        return $recruiters;

    }
    public function verifyRecruiter($recruiterid){
        $recruiter = Recruiter::where("user_id","=",$recruiterid)->first();
        $recruiter->verified=true;
        $recruiter->save();
        return $recruiter;
    }
}
