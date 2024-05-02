<?php
namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Company;
use App\Models\Recruiter;
use App\Models\Seeker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
        $user = Auth::user();
        if($user->user_type==0){
            //recruiter
            $details = Recruiter::join("companies","recruiters.company_id","=","companies.id")
                                ->where("recruiters.user_id","=",$user->id)->get();


        }else if($user->user_type==1){
            //seeker
            $details = Seeker::find($user->id);
        }


        return response()->json([
                'status' => 'success',
                'user' => $user,
                'user_details'=>$details,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);

    }

    public function register(Request $request){
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'type'=>'required|integer'
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name'=>$request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type'=>$request->type
        ]);
        $type=$request->type;
        if($type==0){
            //recruiter
            $request->validate([
                'company_name' => 'required|string|max:255',
                'company_linkedin' => 'required|string|max:255',
                'description' => 'required|string|max:255',
                'logo_base64' => 'required|string',

            ]);
            // COMPUTE LOGO_BASE64 INTO AN IMAGE URL POINT TO AMAZON S3 STORAGE
            // $base64Image = $request->logo_base64;
            // $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));
            // $filename = uniqid() . '.png';
            // $folderPath = 'companylogo/';

            // Storage::disk('s3')->put($folderPath . $filename, $imageData);
            // $url = Storage::disk('s3')->url($folderPath . $filename);
            $url="Fewqfqwef";
            $company=Company::create([
                "company_name"=>$request->company_name,
                "company_linkedin"=>$request->company_linkedin,
                "description"=>$request->description,
                "logo_url"=>$url

            ]);
            $recruiter = Recruiter::create([
                "company_id"=>$company->id,
                "user_id"=>$user->id
            ]);

        }else if($type==1){
            // seeker
            $request->validate([
                'dob' => 'required|string|max:255',
                'resume'=>'required|string'

            ]);
            $seekerController = new SeekerController();
            $resumeid=$seekerController->uploadResume($request->resume,$user->id);

            Seeker::create([
                'dob'=>$request->dob,
                "linkedin"=>"",
                "user_id"=>$user->id
            ]);
        }
        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

}
