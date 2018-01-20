<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
	protected $fillable = ['title', 'slug'];
    
    public function resources()
    {
        return $this->belongsToMany(Resource::class);
    }

    public function playlists()
    {
        return $this->belongsToMany(Playlist::class);
    }

}
