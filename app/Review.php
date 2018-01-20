<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Elasticquent\ElasticquentTrait;

class Review extends Model
{
    use Notifiable;
    use ElasticquentTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'slug', 'body', 'pages', 'status', 'sponsored', 'icon_img', 'url', 'ios_url', 'google_url', 'ios_rating', 'google_rating', 'reviews_category_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        
    ];

    protected $appends = ['header_img', 'slug', 'status', 'tags', 'title', 'user_id', 'expert', 'description', 'reviews_category'];


    public function getHeaderImgAttribute()
    {
        return $this->resource()->first()->header_img;
    }

    public function getSlugAttribute()
    {
        return $this->resource()->first()->slug;
    }

    public function getDescriptionAttribute()
    {
        return $this->resource()->first()->description;
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

    public function getReviewsCategoryAttribute()
    {
        $reviews_category_id = $this->reviews_category_id;
        return ReviewsCategory::find($reviews_category_id);
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
            'status' => $this->status,
            'reviews_category_id' => $this->reviews_category_id,
        );
    }

    protected $mappingProperties = array(
        'title' => [
            'type' => 'string',
            'analyzer' => 'standard',
        ],
        'body' => [
            'type' => 'string',
            'analyzer' => 'standard',
        ],
        'reviews_category_id' => [
            'type' => 'long',
        ]
    );


    public function resource()
    {
        return $this->morphOne(Resource::class,'resourceable');
    }

    public function review_category()
    {
        return $this->belongsTo(ReviewsCategory::class,'reviews_category_id');
    }
}
