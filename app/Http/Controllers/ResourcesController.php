<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Hash;
use App\Resource;
use App\Category;
use App\Quote;
use App\Tag;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Imageupload;

class ResourcesController extends ApiFormController 
{
    public function __construct()
       {
           // Apply the jwt.auth middleware to all methods in this controller
           // except for the authenticate method. We don't want to prevent
           // the user from retrieving their token if they don't already have it
           $this->middleware('jwt.auth', ['except' => ['authenticate', 'show', 'index', 'related_resource', 'related_category_resources', 'similar_resources', 'search']]);
       }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {

        if (!empty(request('search'))){
                /*return Resource::complexSearch(array(
                            'body' => array(
                                'query' => array(
                                    'filtered' => array(
                                        'query' => [
                                            'term' => [ 'title' => 'mySugr' ] ]
                                    )
                                )
                            )
                        ));
                $test = Resource::searchByQuery([
                    'filtered' => [

                        'query' => [
                            'match' => [ 'category.title' => 'Drugs' ]
                        ]
                    ]
                ], null, null, 10000);*/


                $results = [];
                $categories = Category::all();
                $resources = request('all') == 'true' ? Resource::with('tags','category')->get() : Resource::search(request('term'));

                foreach($categories as $cK => $cV){
                    $results[$cK]['id'] = $categories[$cK]['id'];
                    $results[$cK]['title'] = $categories[$cK]['title'];

                    foreach($resources as $rK => $rV){

                        if($resources[$rK]['category']['id'] == $categories[$cK]['id']){
                            $results[$cK]['data'][] = $rV;
                        }
                    }       
                }

                if(!empty(request('categories')) && request('categories') !== 'all' && request('categories') !== '[all]'){
                    
                    $i = 0;
                    //echo 'counts: '.count($results).'<br/><br/>';

                    foreach($results as $rsK => $rsV){
                        //echo 'Database id: '.$results[$rsK]['id']."<br/>";
                        //echo '------------------------<br/>';
                            $hit = 0;
                            $x = 0;
                            foreach(json_decode(request('categories')) as $requestCategory){ 
                                if($results[$rsK]['id'] == $requestCategory){
                                    $hit++;
                                }

                                $x++;

                                //echo 'request category id: '.$requestCategory.'<br/>';
                                if($x == count(json_decode(request('categories')))){
                                    //echo 'we are done with this result<br/>';
                                    if($hit > 0){
                                        //echo 'we got a winner<br/>';
                                    }
                                    else {
                                        //echo 'remove this<br/>';
                                        unset($results[$rsK]);
                                    }
                                }
                                

                            }

                        $i++;
                        //echo '<br/>iteration: '.$i.'<br/>';
                        //echo 'hits: '.$hit.'<br/><br/>';

                        //echo '------------------------<br/><br/><br/><br/>';

                    }
                }

                $newResults = [];
                if(!empty(request('preview')) && request('preview') == true){
                    foreach($results as $rK => $rV){
                        $newResults[] = $results[$rK]['data'];
                    }

                    $results = $newResults;
                }

                $results = array_values($results);

                return response()->json($results);

        }
        else if(request('page') == 'all'){
            return Resource::with('tags','category')->get();
        }
        else {
            return Resource::with('tags')->paginate(10);
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
    public function store(Resource $resource)
    {

        $header_img = '';
        $icon_img = '';

        //var_dump($_POST, $_FILES, $request->all());
        if (request()->hasFile('header_img')) {
            $header_img = Imageupload::upload(request()->file('header_img'), 'original', '/headers/*');
            $header_img = $header_img['original_filedir'];
        }      

        if (request()->hasFile('icon_img')) {
            $icon_img = Imageupload::upload(request()->file('icon_img'), 'original', '/icons/*');
            $icon_img = $icon_img['original_filedir'];
        }

        //VALIDATE FIELDS
        $validator = Validator::make(request()->all(),
        [
            'title' => 'required|max:255',
            'slug' => 'required|max:255',
            'status' => 'required',
            'description' => 'required',
            'sponsored' => 'required',

        ]);


        //IF INVALID
        if($validator->fails()){ 
            return $this->respondInvalid('Error with validation.', $validator->errors());
        }

        //IF VALID
        else { 

            //Try to create contact
            try { 

                $data = [
                    'slug' => request('slug'), 
                    'title' => request('title'), 
                    'description' => request('description'),
                    'body' => request('body'),
                    'status' => request('status'),
                    'ios_url' => request('ios_url'), 
                    'google_url' => request('ios_url'), 
                    'url' => request('url'), 
                    'sponsored' => request('sponsored'),
                    'ios_rating' => request('ios_rating'),
                    'google_rating' => request('google_rating'),
                    'category_id' => request('category_id'),
                    'expert_id' => request('expert_id'),
                    'icon_img' => $icon_img,
                    'header_img' => $header_img,
                ];

                $resource = $resource->create($data);
                $tags = json_decode(request('tags'));

                //If new tags then create and add for sync
                foreach($tags as $tagK => $tagV){
                    if(!is_int($tags[$tagK])){
                        if($tag = Tag::firstOrCreate([
                            'title' => $tagV,
                            'slug' => str_slug($tagV),
                        ]))
                        {
                            //$tag->resources()->sync($id);
                            unset($tags[$tagK]);
                            $tags[] = $tag->id;
                        }
                    }
                }

                if($resource->id && $resource->addToIndex() && $resource->tags()->sync($tags) && Quote::create(['message' => request('quote'), 'resource_id' => $resource->id, 'expert_id' => request('expert_id')]))
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        try {
            if($resource = Resource::with('tags','category','expert', 'quote')->where('id',$id)->first()){
                return response()->json($resource);
            }
            else if ($resource = Resource::with('tags','category','expert', 'quote')->where('slug',$id)->first()){
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
            'status' => 'required',
        ]);

        //IF INVALID
        if($validator->fails()){ 
            return $this->respondInvalid('Error with validation.', $validator->errors());
        }

        //IF VALID
        else { 

            try {
                //Update 
                $data = [
                        'title' => request('title'),
                        'slug' => request('slug'), 
                        'body' => request('body'),
                        'header_img' => request('header_img'),
                        'status' => request('status'),
                        'user_id' => request('user_id'),
                        ];

                $resource = Resource::find($id);
                $tags = json_decode(request('tags'));

                //If new tags then create and add for sync
                foreach($tags as $tagK => $tagV){
                    if(!is_int($tags[$tagK])){
                        if($tag = Tag::create([
                            'title' => $tagV,
                            'slug' => str_slug($tagV),
                        ]))
                        {
                            $tag->resources()->sync($id);
                            unset($tags[$tagK]);

                            $tags[] = $tag->id;
                        }
                    }
                }

                if($resource->update($data) && $resource->tags()->sync($tags) && $resource->quote()->update(['message' => request('quote')])) 
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
                        return $this->respondInvalid('Invalid.', ['error'=> $errorCode, 'message'=>$e]); 
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
            if(Resource::find($id)->delete()){
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

    public function related_resource($id)
    {

        if($resource = Resource::with('tags','category','expert', 'quote')->where('id',$id)->first()){
            return Resource::with('tags','category','expert', 'quote')->where('id',$resource->related_resource_id)->first();
        }
        else if ($resource = Resource::with('tags','category','expert', 'quote')->where('slug',$id)->first()){
            return Resource::with('tags','category','expert', 'quote')->where('id',$resource->related_resource_id)->first();
        }
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
    public function search($term, $filter = false, $value = null) 
    {
        // delete
        try { 
            if(!$filter && $search = Resource::search($term)->where('resourceable_type','!=','App\Page')->values()->paginate(10)){
                return $search;
            }
            else if($filter == 'relevance' && $search = $search = Resource::search($term)->where('resourceable_type','!=','App\Page')->values()->paginate(10)){
             //Resource::search($term)->filter(function($value, $key) use($filter) {)
                return $search;
            }
            else if($filter == 'newest' && $search = Resource::search($term)->where('resourceable_type','!=','App\Page')->sortByDesc('created_at')->values()->paginate(10)){
                return $search;
            }
            else if($filter == 'oldest' && $search = Resource::search($term)->where('resourceable_type','!=','App\Page')->sortBy('created_at')->values()->paginate(10)){
                return $search;
            }
            else if($filter == 'type'){
                if($value == 'articles'){
                    $search = Resource::search($term)->where('resourceable_type', 'App\Article')->values()->paginate(10);
                }
                else if($value == 'videos'){
                    $search = Resource::search($term)->where('resourceable_type', 'App\Video')->values()->paginate(10);
                }
                else if($value == 'reviews'){
                    $search = Resource::search($term)->where('resourceable_type', 'App\Review')->values()->paginate(10);
                }
                return $search;
            }
            else if($filter == 'expert' && $search = Resource::search($term)->where('resourceable_type','!=','App\Page')->sortByDesc('user_id')->values()->paginate(10)){
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
