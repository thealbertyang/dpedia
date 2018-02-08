<?php

namespace App\Http\Controllers;

use Auth;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Hash;
use App\Resource;
use App\Category;
use App\Quote;
use App\Tag;
use App\Article;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Imageupload;

class ArticlesController extends ApiFormController
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
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(request('page') == 'all'){
            return Article::all();
        }
        else {
            return Article::with('resource')->paginate(10);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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
                $header_img = '';

                //var_dump($_POST, $_FILES, request()->all());
                if(request()->hasFile('header_img')) {
                    $header_img = Imageupload::upload(request()->file('header_img'), 'original', '/headers/*');
                    $header_img = $header_img['original_filedir'];
                } 

                $resourceData = [
                    'slug' => request('slug'), 
                    'title' => request('title'), 
                    'status' => request('status'),
                    'description' => request('description'),
                    'user_id' => Auth::user()->id,
                    'header_img' => $header_img,
                ];

                $data = [
                    'pages' => request('pages'), 
                    'body' => request('body'),
                ];

                $resource = Resource::create($resourceData);

                $tags = [];

                if(!empty(json_decode(request('tags')))){
                    //If new tags then create and add for sync
                    foreach(json_decode(request('tags')) as $tagK => $tagV){
                        if(!empty($tagV->create) && $tagV->create){
                            if($tag = Tag::firstOrCreate([
                                'title' => $tagV->value,
                                'slug' => str_slug($tagV->value),
                            ]))
                            {
                                $tag->resources()->sync($resource->id);
                                $tags[] = $tag->id;
                            }
                        }
                        else {
                            $tags[] = $tagV->value;
                        }
                    }
                }

                if($resource->id && Article::create($data)->resource()->save($resource) && $resource->tags()->sync($tags))
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
                        return $this->respondDuplicate('Duplicate Entry.', ['error'=> $e, 'user'=>'This user already exists.', ]); 
                        break;
                    default:
                        return $this->respondInvalid('Invalid.', ['error'=> $e, 'request'=>request()->all()]); 
                        break;
                }
            }
        }
    }

    public function normalize($data){
        $attributes = $data->attributesToArray();
        $attributes = array_merge($attributes, $data->relationsToArray());
        $attributes = array_merge($attributes, $data->relationsToArray()['resource']);
        unset($attributes['resource']);
        return $attributes;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Articles  $articles
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            if($resource = Article::with('resource')->where('id',$id)->first()){
                return response()->json($this->normalize($resource));
            }
            else if ($resource = Article::with('resource')->whereHas('resource', function($q) use ($id) {
                $q->where('slug',$id);
            })->first()){
                return response()->json($resource);
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
                    return $this->respondInvalid('Invalid.', ['error'=> $e, 'request'=>request()->all()]); 
                    break;
            }
        } 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Articles  $articles
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Articles  $articles
     * @return \Illuminate\Http\Response
     */
    public function update($id)
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
                $resource = Article::find($id);

                $header_img = $resource->header_img;

                //var_dump($_POST, $_FILES, request()->all());
                if(request()->hasFile('header_img')) {
                    $header_img = Imageupload::upload(request()->file('header_img'), 'original', '/headers/*');
                    $header_img = $header_img['original_filedir'];
                }      

                $resourceData = [
                    'slug' => str_slug(request('slug')), 
                    'title' => request('title'), 
                    'status' => request('status'),
                    'description' => request('description'),
                    'user_id' => Auth::user()->id, 
                    'header_img' => $header_img,
                ];

                $data = [
                    'pages' => request('pages'), 
                    'body' => request('body'),
                ];

                //var_dump($resource);
                $tags = [];

                if(!empty(json_decode(request('tags')))){
                    //If new tags then create and add for sync
                    foreach(json_decode(request('tags')) as $tagK => $tagV){
                        if(!empty($tagV->create) && $tagV->create){
                            if($tag = Tag::firstOrCreate([
                                'title' => $tagV->value,
                                'slug' => str_slug($tagV->value),
                            ]))
                            {
                                $tag->resources()->sync($id);
                                $tags[] = $tag->id;
                            }
                        }
                        else {
                            $tags[] = $tagV->value;
                        }
                    }
                }

                if($resource->update($data) && $resource->resource->update($resourceData) && $resource->resource->tags()->sync($tags)) 
                {
                    return $this->respondSuccess('Successful edit.');
                }
            }
            catch(\Illuminate\Database\QueryException $e){
                $errorCode = $e->errorInfo[1];

                switch ($errorCode) {
                    //1062 == Duplicate entry for unique MySQL
                    case 1062: 
                        return $this->respondDuplicate('Duplicate Entry.', ['error'=>'This entry already exists.', 'message'=> $e]); 
                        break;
                    default:
                        return $this->respondError(null, ['error'=> $errorCode, 'message'=>$e]); 
                        break;
                }
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Articles  $articles
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // delete
        try { 
            if(Article::find($id)->resource()->delete() && Article::find($id)->delete()){
                return $this->respondSuccess('Successfully deleted.');
            }
        }
        catch(\Illuminate\Database\QueryException $e){
            $errorCode = $e->errorInfo[1];

            switch ($errorCode) {
                //default error
                default: 
                    return $this->respondError(); 
                    break;
            }
        }
    }

    /**
     * Search specified resource from storage.
     *
     * @param  \App\Articles  $articles
     * @return \Illuminate\Http\Response
     */
    public function search($term)
    {
        // delete
        try { 
            if($search = Article::search($term)){
                return $search;
            }
        }
        catch(\Illuminate\Database\QueryException $e){
            $errorCode = $e->errorInfo[1];

            switch ($errorCode) {
                //default error
                default: 
                    return $this->respondError(); 
                    break;
            }
        }
    }
}
