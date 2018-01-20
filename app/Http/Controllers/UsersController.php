<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\Administrator;
use App\Expert;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class UsersController extends ApiFormController
{
    public function __construct()
       {
           // Apply the jwt.auth middleware to all methods in this controller
           // except for the authenticate method. We don't want to prevent
           // the user from retrieving their token if they don't already have it
           $this->middleware('jwt.auth', ['except' => ['authenticate']]);
       }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $users = User::all();
        return User::paginate(10);
        // the token is valid and we have found the user via the sub claim
        //return response()->json(compact('users'));
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
    public function store(User $user)
    {

        //VALIDATE FIELDS
        $validator = Validator::make(request()->all(),
        [
            'first_name' => 'required|alpha|max:255',
            'last_name' => 'required|alpha|max:255',
            'email' => 'required|email',
            'password' => 'required|max:99999999999',
            'role' => 'required',
        ]);

        //IF INVALID
        if($validator->fails()){ 
            return $this->respondInvalid('Error with validation.', $validator->errors());
        }

        //IF VALID
        else { 
            //Try to create contact
            try { 
                if(User::create([
                    'first_name' => request('first_name'),
                    'last_name' => request('last_name'),
                    'email' => request('email'),
                    'password' =>  Hash::make(request('password'))
                ]))
                {
                    return $this->respondSuccess('Successful submit.');
                }
            }
            //Creating contact error
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        try {
            if($user = User::find($id)){
                return $user;
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
                    return $this->respondInvalid('Invalid.', ['user'=> request()->all()]); 
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
            'password' => 'max:99999999999',
            'role' => 'required',
        ]);

        //IF INVALID
        if($validator->fails()){ 
            return $this->respondInvalid('Error with validation.', $validator->errors());
        }

        //IF VALID
        else { 

            try {
                //Update 

                $user = User::find($id);
                $data = [
                    'first_name' => request('first_name'), 
                    'last_name' => request('last_name'), 
                    'email' => request('email'), 
                    'password' => ''
                ];

                $role = json_decode(request('role'));

                if($role->value !== $user->role->value){
                    echo "We want to change it from ".$user->role->value." to ".$role->value;
                    
                    if(!empty($user->userable_id) && $user->userable_id !== null){
                        $roleable = $user->userable_type::find($user->userable_id);
                        $roleable->delete();
                    }

                    if($role->value == 'member'){
                        $data['userable_type'] = null;
                        $data['userable_id'] = null;
                    }                    
                    else if($role->value == 'admin'){
                        $admin = Administrator::create();
                        $data['userable_type'] = get_class($admin);
                        $data['userable_id'] = $admin->id;
                    }                    
                    else if($role->value == 'expert'){
                        $admin = Expert::create();
                        $data['userable_type'] = get_class($admin);
                        $data['userable_id'] = $admin->id;
                    }
                }   

                $password = $request->password ? Hash::make(request('password')) : $user->password;
                $data['password'] = $password;

               if(User::where('id', $id)->update($data)){
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
                        return $this->respondInvalid('Invalid.', ['error'=> $e]); 
                        break;
                }
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        // delete
        try { 
            if(User::find($id)->delete()){
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
