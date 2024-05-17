<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function getCompanyLogos(){
        $companies = Company::select("logo_url")->get();
        return $companies;
    }
}
