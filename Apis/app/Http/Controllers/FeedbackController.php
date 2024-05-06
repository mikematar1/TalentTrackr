<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function getRandomFeedbacks(){
        $randomFeedback = Feedback::inRandomOrder()->join("users","users.id","=","feedback.user_id")->take(5)->get();
        return $randomFeedback;
    }
}
