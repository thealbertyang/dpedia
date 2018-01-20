<?php

namespace App\Http\Controllers;
 
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Hash;
use App\Expert;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Imageupload;

class ExpertsController extends ApiFormController
{
    public function __construct()
       {
           // Apply the jwt.auth middleware to all methods in this controller
           // except for the authenticate method. We don't want to prevent
           // the user from retrieving their token if they don't already have it
           $this->middleware('jwt.auth', ['except' => ['authenticate', 'show', 'index']]);
       }

    /**
     * Display a listing of the Expert.
     *
     * @return Response
     */
    public function index()
    {
        if(request('page') == 'all'){
            return Expert::all();
        }
        else {
            return Expert::paginate(10);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Expert $user)
    {

        //VALIDATE FIELDS
        $validator = Validator::make(request()->all(),
        [
            'first_name' => 'required|alpha|max:255',
            'last_name' => 'required|alpha|max:255',
            'email' => 'required|email',
            'password' => 'required|max:99999999999'
        ]);

        //IF INVALID
        if($validator->fails()){ 
            return $this->respondInvalid('Error with validation.', $validator->errors());
        }

        //IF VALID
        else { 

            try {
                //Update 
                $avatar_img = '';

                //var_dump($_POST, $_FILES, $request->all());
                /*if (request()->hasFile('avatar_img')) {
                   $avatar_img = Imageupload::upload(request()->file('avatar_img'), 'original', '/avatars/*');
                   $avatar_img = $avatar_img['original_filedir'];
                }  */


                $data = [
                    'occupation' => request('occupation'),
                    'credentials' => request('credentials'),
                    'about' => request('about'),
                    'highlights' => request('highlights'),
                    'affiliations' => request('affiliations'),
                    'personal_url' => request('personal_url'),
                ];

                $userData = [
                    'first_name' => request('first_name'), 
                    'last_name' => request('last_name'), 
                    'email' => request('email'), 
                    'password' => ''
                ];

                $password = request('password') ? Hash::make(request('password')) : $expert->user->password;
                $userData['password'] = $password;

                $user = User::create($userData);

                if($user->id && Expert::create($data)->user()->save($user)){
                    return $this->respondSuccess('Successful edit.');
                }
            }
            catch(\Illuminate\Database\QueryException $e){
                $errorCode = $e->errorInfo[1];

                switch ($errorCode) {
                    //1062 == Duplicate entry for unique MySQL
                    case 1062: 
                        return $this->respondDuplicate('Duplicate Entry.', ['user'=>'This user already exists.']); 
                        break;
                    default:
                        return $this->respondInvalid('Invalid.', [ 'user'=> request()->all(), 'errors' => $e]); 
                        break;
                }
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        try {

            if($expert = Expert::find($id)){
                return response()->json($expert);
            }
            
            else {
                $expert_id = User::where('username', '=', $id)->first()->userable_id;
                $expert = Expert::find($expert_id);

                return response()->json($expert);
                
            }
        }
        catch(\Illuminate\Database\QueryException $e){
            $errorCode = $e->errorInfo[1];

            switch ($errorCode) {
                //1062 == Duplicate entry for unique MySQL
                case 1062: 
                    return $this->respondDuplicate('Duplicate Entry.', ['user'=>'This user already exists.']); 
                    break;
                default:
                    return $this->respondInvalid('Invalid.', ['error'=> $e]); 
                    break;
            }
        } 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        //VALIDATE FIELDS
        $validator = Validator::make(request()->all(),
        [
            'first_name' => 'required|alpha|max:255',
            'last_name' => 'required|alpha|max:255',
            'email' => 'required|email',
            'password' => 'max:99999999999'
        ]);

        //IF INVALID
        if($validator->fails()){ 
            return $this->respondInvalid('Error with validation.', $validator->errors());
        }

        //IF VALID
        else { 

            try {
                //Update 
                $avatar_img = '';

                //var_dump($_POST, $_FILES, $request->all());
                /*if (request()->hasFile('avatar_img')) {
                   $avatar_img = Imageupload::upload(request()->file('avatar_img'), 'original', '/avatars/*');
                   $avatar_img = $avatar_img['original_filedir'];
                }  */

                $expert = Expert::find($id);

                $data = [
                    'occupation' => request('occupation'),
                    'credentials' => request('credentials'),
                    'about' => request('about'),
                    'highlights' => request('highlights'),
                    'affiliations' => request('affiliations'),
                    'personal_url' => request('personal_url'),
                ];

                $userData = [
                    'first_name' => request('first_name'), 
                    'last_name' => request('last_name'), 
                    'email' => request('email'), 
                    'password' => ''
                ];

                $password = $request->password ? Hash::make(request('password')) : $expert->user->password;
                $userData['password'] = $password;

                if($expert->update($data) && $expert->user->update($userData)){
                    return $this->respondSuccess('Successful edit.');
                }
            }
            catch(\Illuminate\Database\QueryException $e){
                $errorCode = $e->errorInfo[1];

                switch ($errorCode) {
                    //1062 == Duplicate entry for unique MySQL
                    case 1062: 
                        return $this->respondDuplicate('Duplicate Entry.', ['user'=>'This user already exists.']); 
                        break;
                    default:
                        return $this->respondInvalid('Invalid.', [ 'user'=> request()->all(), 'errors' => $e]); 
                        break;
                }
            }
        }
    }

    /**
     * Remove the specified Expert from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        // delete
        try { 
            if(Expert::find($id)->delete()){
                return $this->respondSuccess('Successfully deleted.');
            }
        }
        catch(\Illuminate\Database\QueryException $e){
            $errorCode = $e->errorInfo[1];

            switch ($errorCode) {
                //1062 == Duplicate entry for unique MySQL
                case 1062: 
                    return $this->respondDuplicate('Duplicate Entry.', ['user'=>'This user already exists.']); 
                    break;
            }
        }
    }
}
