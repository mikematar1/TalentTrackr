<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SeekerController extends Controller
{
    public function parse(){
        $filepath = "resume.docx";
        $handle = fopen($filepath, "r");
        $contents = fread($handle, filesize($filepath));
        fclose($handle);

        $modifiedDate = date("Y-m-d", filemtime($filepath));

        $base64str = base64_encode($contents);
        $data = ["DocumentAsBase64String" => $base64str, "DocumentLastModified" => $modifiedDate];

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

    }
    public function editInformation(Request $request){

    }
    public function addFeedback(Request $request){

    }



}
