<?php

namespace App\Http\Controllers;

use App\Review;
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

class ReviewsController extends ApiFormController 
{
    public function __construct()
    {
       // Apply the jwt.auth middleware to all methods in this controller
       // except for the authenticate method. We don't want to prevent
       // the user from retrieving their token if they don't already have it
       $this->middleware('jwt.auth', ['except' => ['authenticate', 'show', 'index', 'related', 'search']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(request('page') == 'all'){
            return Review::all();
        }
        else {
            return Review::paginate(10);
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
            try {
                //Update 

                $header_img = '';
                $icon_img = '';

                //var_dump($_POST, $_FILES, $request->all());
                if(request()->hasFile('header_img')) {
                    $header_img = Imageupload::upload(request()->file('header_img'), 'original', '/headers/*');
                    $header_img = $header_img['original_filedir'];
                }      

                if(request()->hasFile('icon_img')) {
                    //echo "hi";
                    $icon_img = Imageupload::upload(request()->file('icon_img'), 'original', '/icons/*');
                    $icon_img = $icon_img['original_filedir'];
                }

                $resourceData = [
                    'slug' => request('slug'), 
                    'title' => request('title'), 
                    'description' => request('description'), 
                    'status' => request('status'),
                    'user_id' => Auth::user()->id,
                    'header_img' => $header_img,
                ];

                $data = [
                    'url' => request('url'), 
                    'body' => request('body'), 
                    'ios_url' => request('ios_url'),
                    'google_url' => request('google_url'),
                    'ios_rating' => request('ios_rating'),
                    'google_rating' => request('google_rating'),
                    'sponsored' => json_decode(request('sponsored'))->value,
                    'reviews_category_id' => json_decode(request('reviews_category_id'))->value,
                    'icon_img' => $icon_img,
                    'pages' => request('pages'),  
                ];

                $resource = Resource::create($resourceData);
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
                                $tag->resources()->sync($resource->id);
                                $tags[] = $tag->id;
                            }
                        }
                        else {
                            $tags[] = $tagV->value;
                        }
                    }
                }

                if($resource->id && Review::create($data)->resource()->save($resource) && $resource->tags()->sync($tags) && $resource->addToIndex()) 
                {
                    return $this->respondSuccess('Successful creation.');
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
     * @param  \App\Reviews  $reviews
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            if($resource = Review::with('resource')->where('id',$id)->first()){
                return response()->json($this->normalize($resource));
            }
            else if ($resource = Review::whereHas('resource', function($q) use ($id) {
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
     * @param  \App\Reviews  $reviews
     * @return \Illuminate\Http\Response
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Reviews  $reviews
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
                $header_img = '';
                $icon_img = '';

                //var_dump($_POST, $_FILES, request()->all());
                if(request()->hasFile('header_img')) {
                    $header_img = Imageupload::upload(request()->file('header_img'), 'original', '/headers/*');
                    $header_img = $header_img['original_filedir'];
                }      

                if(request()->hasFile('icon_img')) {
                    $icon_img = Imageupload::upload(request()->file('icon_img'), 'original', '/icons/*');
                    $icon_img = $icon_img['original_filedir'];
                }

                $resourceData = [
                    'slug' => request('slug'), 
                    'title' => request('title'), 
                    'description' => request('description'), 
                    'status' => request('status'),
                    'user_id' => Auth::user()->id,
                    'header_img' => $header_img,
                ];

                $data = [
                    'url' => request('url'), 
                    'body' => request('body'), 
                    'ios_url' => request('ios_url'),
                    'google_url' => request('google_url'),
                    'ios_rating' => request('ios_rating'),
                    'google_rating' => request('google_rating'),
                    'sponsored' => json_decode(request('sponsored'))->value,
                    'reviews_category_id' => json_decode(request('reviews_category_id'))->value,
                    'icon_img' => $icon_img,
                    'pages' => request('pages'),
                ];

                $resource = Review::find($id);
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

                if($resource->update($data) && $resource->resource->update($resourceData) && $resource->resource->tags()->sync($tags) && $resource->resource->removeFromIndex() && $resource->resource->addToIndex()) 
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
     * @param  \App\Reviews  $reviews
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reviews $reviews)
    {
        //
    }


    public function related($id)
    {


        $ignoredIds = [];


        $review = Review::find($id) ?? Review::whereHas('resource', function ($query) use ($id) { $query->where('slug', $id); })->first();

        $results['related_single'] = Review::where('reviews_category_id', $review->reviews_category_id)->first();
        $results['related_in_category'] = Review::where('reviews_category_id', $review->reviews_category_id)->get();
        $results['related_shuffle'] = Review::where('reviews_category_id', $review->reviews_category_id)->get()->shuffle();

        return $results;
    }

    public function related_category_resources($id, $category_id)
    {

        if($resource = Resource::with('tags','category','expert', 'quote')->where('category_id','=',$category_id)->where('id','!=',$id)->get()){
            return $resource;
        }
    }

    public function similar_resources($id)
    {
        if($resource = Resource::with('tags','category','expert', 'quote')->where('id','!=',$id)->get()->shuffle()){
            return $resource;
        }
    }

    /**
     * Search specified resource from storage.
     *
     * @param  \App\Reviews  $Review
     * @return \Illuminate\Http\Response
     */
    public function search($term, $filter = false)
    {
        // delete
        try { 
            if(!$filter && $search = Review::search($term)->values()->paginate(10)){
                return $search;
            }
            else if($filter == 'reviews_category' && !empty(request('ids'))){
                $search = Review::search($term)->whereIn('reviews_category_id', request('ids'))->values()->paginate(10);
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
