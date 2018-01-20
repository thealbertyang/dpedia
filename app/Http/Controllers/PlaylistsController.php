<?php

namespace App\Http\Controllers;

use App\Playlist;
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

class PlaylistsController extends ApiFormController 
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
            return Playlist::all();
        }
        else {
            return Playlist::paginate(10);
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
            'type' => 'required|max:255',
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
                    'type' => request('type'), 
                    'status' => request('status'),
                    'user_id' => Auth::user()->id,
                ];

                $resource = Playlist::create($data);
                //var_dump($resource);
                $tags = [];


                if(request()->has('tags')){
                    //If new tags then create and add for sync
                    foreach(json_decode(request('tags')) as $tagK => $tagV){
                        if(!empty($tagV->create) && $tagV->create){
                            if($tag = Tag::firstOrCreate([
                                'title' => $tagV->value,
                                'slug' => str_slug($tagV->value),
                            ]))
                            {
                                $tag->playlists()->sync($id);
                                $tags[] = $tag->id;
                            }
                        }
                        else {
                            $tags[] = $tagV->value;
                        }
                    }
                }

                //Sync playlists
                $playlist = [];
                foreach(json_decode(request('playlist')) as $playlistK => $playlistV){ 
                   $playlist[] = $playlistV->id;

                }


                if($resource->id && $resource->resources()->sync($playlist) && $resource->tags()->sync($tags)) 
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
     * Display the specified resource.
     *
     * @param  \App\Playlists  $playlists
     * @return \Illuminate\Http\Response
     */
public function show($id)
    {
        try {
            if($resource = Playlist::where('id',$id)->first()){
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
     * @param  \App\Playlists  $playlists
     * @return \Illuminate\Http\Response
     */
    public function edit(Playlist $playlists)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Playlists  $playlists
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        //VALIDATE FIELDS
        $validator = Validator::make(request()->all(),
        [
            'title' => 'required|max:255',
            'type' => 'required|max:255',
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
                    'type' => request('type'), 
                    'status' => request('status'),
                ];

                $resource = Playlist::find($id);
                //var_dump($resource);
                $tags = [];

                //If new tags then create and add for sync
                foreach(json_decode(request('tags')) as $tagK => $tagV){
                    if(!empty($tagV->create) && $tagV->create){
                        if($tag = Tag::firstOrCreate([
                            'title' => $tagV->value,
                            'slug' => str_slug($tagV->value),
                        ]))
                        {
                            $tag->playlists()->sync($id);
                            $tags[] = $tag->id;
                        }
                    }
                    else {
                        $tags[] = $tagV->value;
                    }
                }

                //Sync playlists
                $playlist = [];
                foreach(json_decode(request('playlist')) as $playlistK => $playlistV){ 
                   $playlist[] = $playlistV->id;

                }


                if($resource->update($data) && $resource->resources()->sync($playlist) && $resource->tags()->sync($tags)) 
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
     * @param  \App\Playlists  $playlists
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // delete
        try { 
            if(Playlist::find($id)->delete()){
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
