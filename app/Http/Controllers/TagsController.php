<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tag;

class TagsController extends Controller
{
    public function index()
    {
        $tags = Tag::all();
        return $tags;
        // the token is valid and we have found the user via the sub claim
        //return response()->json(compact('users'));
    }
}
