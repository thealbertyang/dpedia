<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Hash;
use App\Category;
use App\Resource;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class CategoriesController extends ApiFormController
{
    public function __construct()
       {
           // Apply the jwt.auth middleware to all methods in this controller
           // except for the authenticate method. We don't want to prevent
           // the user from retrieving their token if they don't already have it
           $this->middleware('jwt.auth', ['except' => ['authenticate', 'show', 'index']]);
       }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $categories = Category::with('resources')->get();
        return $categories;
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
    public function store()
    {

        //VALIDATE FIELDS
        $validator = Validator::make(request()->all(),
        [
            'title' => 'required|max:255',
            'slug' => 'required|max:255',
        ]);


        //IF INVALID
        if($validator->fails()){ 
            return $this->respondInvalid('Error with validation.', $validator->errors());
        }

        //IF VALID
        else { 

            //Try to create contact
            try { 
                if(Category::create([
                    'title' => request('title'),
                    'slug' => request('slug'),
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
            if($resource = Category::find($id)){
                return $resource;
            }
            else if ($resource = Category::where('slug',$id)){
                return $resource->get();
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
            'title' => 'required|max:255',
            'slug' => 'required|max:255',
        ]);

        //IF INVALID
        if($validator->fails()){ 
            return $this->respondInvalid('Error with validation.', $validator->errors());
        }

        //IF VALID
        else { 

            try {
                //Update 

                $user = Category::find($id);
                $data = [
                        'title' => request('title'), 
                        'slug' => request('slug'), 
                        ];

                if(Category::where('id', $id)->update($data)){
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
                        return $this->respondInvalid('Invalid.', ['user'=> request()->all()]); 
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
            if(Category::find($id)->resources()){
                $resources = Resource::where('category_id',$id)->get();
                foreach ($resources as $resource){
                    $resource = Resource::find($resource->id);
                    $resource->category()->dissociate(); 
                    $resource->save();
                }
                
            }
            if(Category::find($id)->delete()){
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
