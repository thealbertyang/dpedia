<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Elasticquent\ElasticquentTrait;
use VideoApi; 

class Video extends Model
{
    use Notifiable;
    use ElasticquentTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'slug', 'body', 'pages', 'status', 'video_url'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        
    ];

    protected $appends = ['resource_id', 'body', 'header_img', 'slug', 'status', 'tags', 'title', 'description', 'user_id', 'expert', 'video_time','video', 'video_html'];

    public function getResourceIdAttribute()
    {

        return $this->resource()->first()->id;
    }

    public function getBodyAttribute()
    {

        return $this->resource()->first()->body;
    }

    public function getHeaderImgAttribute()
    {
        return $this->resource()->first()->header_img;
    }

    public function getSlugAttribute()
    {
        return $this->resource()->first()->slug;
    }

    public function getStatusAttribute()
    {
        return $this->resource()->first()->status;
    }

    public function getTitleAttribute()
    {
        return $this->resource()->first()->title;
    }

    public function getUserIdAttribute()
    {
        return $this->resource()->first()->user_id;
    }

    public function getTagsAttribute()
    {
        return $this->resource()->first()->tags;
    }

    public function getExpertAttribute()
    {
        $user_id = $this->resource()->first()->user_id;
        return Expert::find(User::find($user_id)->userable_id);
    }

    public function getVideoAttribute()
    {
        return VideoApi::getVideoDetails($this->video_url, 'AIzaSyCyIDKoKO_6UAGtUHof9Vs42OZsMEvXrj8');
    }

    public function getDescriptionAttribute()
    {
        return ($this->resource()->first()->description !== null && !empty($this->resource()->first()->description)) ? $this->resource()->first()->description : VideoApi::getVideoDetails($this->video_url, 'AIzaSyCyIDKoKO_6UAGtUHof9Vs42OZsMEvXrj8')['description'];
    }

    public function getVideoTimeAttribute()
    {
        return VideoApi::getVideoDetails($this->video_url, 'AIzaSyCyIDKoKO_6UAGtUHof9Vs42OZsMEvXrj8')['duration'];
    }    

    public function getVideoHtmlAttribute()
    {
        return VideoApi::getVideoDetails($this->video_url, 'AIzaSyCyIDKoKO_6UAGtUHof9Vs42OZsMEvXrj8')['html'];
    }

    public function getIndexDocumentData()
    {
        return array(
            'id'        => $this->id,
            'slug'      => $this->slug,
            'title'      => $this->title,
            'body' => $this->body,
            'tags'  => $this->tags,
            'pages' => $this->pages,
            'expert_id' => $this->expert_id,
            'status' => $this->status,
        );
    }

    protected $mappingProperties = array(
        'title' => [
            'type' => 'string',
            'analyzer' => 'standard',
        ],
        'category' => [
            'type' => 'object'
        ],
        'tags' => [
            'type' => 'object'
        ]
    );


    public function resource()
    {
        return $this->morphOne(Resource::class,'resourceable');
    }

    public function page()
    {
        return $this->morphOne(Page::class,'heroable');
    }
}
