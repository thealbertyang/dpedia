<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\FeedbackReceived;
use App\Mail\DoctorsReceived;
use App\Mail\ResourcesReceived;
use Validator;

class ContactFormController extends ApiFormController
{

    public function feedback()
    {
        //VALIDATE FIELDS
        $validator = Validator::make(request()->all(),
        [
            'feedback' => 'required:max:9000',
        ]);

        //IF INVALID
        if($validator->fails()){ 
            return $this->respondInvalid('Error with validation.', $validator->errors());
        }

        //IF VALID
        else { 

            \Mail::to('admin@doctorpedia.com')->send(new FeedbackReceived(request()->all()));

            if(count(\Mail::failures()) == 0){
                return $this->respondSuccess('Successful submit.');
            }

        }
    }

    public function doctors()
    {
        //VALIDATE FIELDS
        $validator = Validator::make(request()->all(),
        [
            'full_name' => 'required|alpha_spaces',
            'phone' => 'required|phone:US',
            'role' => 'required|alpha_spaces',
            'email' => 'required|email',
            'practice_name' => 'required',
            'found_us' => 'required',
        ]);

        //IF INVALID
        if($validator->fails()){ 
            return $this->respondInvalid('Error with validation.', $validator->errors());
        }

        //IF VALID
        else { 

            \Mail::to('admin@doctorpedia.com')->send(new DoctorsReceived(request()->all()));

            if(count(\Mail::failures()) == 0){
                return $this->respondSuccess('Successful submit.');
            }

        }
    }

    public function resources()
    {

        //VALIDATE FIELDS
        $validator = Validator::make(request()->all(),
        [
            'full_name' => 'required|alpha_spaces',
            'phone' => 'required|phone:US',
            'resource_type' => 'required|alpha_spaces',
            'email' => 'required|email',
            'resource_url' => 'required|is_url',
            'found_us' => 'required',
        ]);

        //IF INVALID
        if($validator->fails()){ 
            return $this->respondInvalid('Error with validation.', $validator->errors());
        }

        //IF VALID
        else { 

            \Mail::to('admin@doctorpedia.com')->send(new ResourcesReceived(request()->all()));

            if(count(\Mail::failures()) == 0){
                return $this->respondSuccess('Successful submit.');
            }

        }
    	
    }
}
