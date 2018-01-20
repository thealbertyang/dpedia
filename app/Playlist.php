<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Elasticquent\ElasticquentTrait;

class Playlist extends Model
{
    use Notifiable;
    use ElasticquentTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'status', 'type', 'user_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        
    ];

    protected $appends = ['resources','tags', 'expert'];

    
    public function getExpertAttribute()
    {
        return User::find($this->user_id);
    }    
     
    public function getResourcesAttribute()
    {
        return $this->resources()->get();
    }    

    public function getTagsAttribute()
    {
        return $this->tags()->get();
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function resources()
    {
        return $this->belongsToMany(Resource::class);
    }

    public function page()
    {
        return $this->morphOne(Page::class,'heroable');
    }
}
