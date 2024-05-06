<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\RecruiterController;
use App\Http\Controllers\SeekerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::group(["prefix" => "v0.1"], function () {
    Route::group(["prefix"=>"auth"],function(){
        Route::controller(AuthController::class)->group(function () {
            Route::post('login', 'login');
            Route::post('register', 'register');
            Route::post('logout', 'logout');
            Route::post('refresh', 'refresh');

        });
    });
    Route::group(["prefix"=>"seeker"],function(){
        Route::middleware(['auth', 'check.seeker'])->group(function () {
            Route::post("edit",[SeekerController::class,"editInformation"]);
            Route::get("get",[SeekerController::class,"getInformation"]);
            Route::get("getmatches",[SeekerController::class,"getMatches"]);
            Route::post("addfeedback",[SeekerController::class,"addFeedback"]);
        });
    });

    Route::group(["prefix"=>"recruiter"],function(){
        Route::middleware(['auth', 'check.recruiter'])->group(function () {
            Route::group(["prefix"=>"listing"],function(){
                Route::post("add",[RecruiterController::class,"addListing"]);
                Route::get("delete/{listingid}",[RecruiterController::class,"deleteListing"]);
            });
            Route::get("get",[RecruiterController::class,"getInformation"]);
        });
    });

    Route::group(["prefix"=>"listings"],function(){
        Route::get("/",[ListingController::class,"getListings"]);
        Route::get("recruiter/{recruiterid}",[ListingController::class,"getRecruiterListings"]);
    });
    Route::group(["prefix"=>"feedbacks"],function(){
        Route::get("/",[FeedbackController::class,"getRandomFeedbacks"]);
    });


});

