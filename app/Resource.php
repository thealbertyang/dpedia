<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Elasticquent\ElasticquentTrait;
use App\Article;
use App\Playlist;
use App\User;
use App\ReviewsCategory;

class Resource extends Model
{
    use Notifiable;
    use ElasticquentTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'slug', 'body', 'status', 'description', 'icon_img', 'header_img', 'url', 'ios_url', 'google_url', 'ios_rating', 'google_rating', 'sponsored', 'category_id', 'user_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        
    ];

    public function getIndexDocumentData()
    {
        $results = $this->resourceable;
        $results['resourceable_type'] = $this->resourceable_type;
        return $results;
    }

    protected $mappingProperties = array(
        'title' => [
            'type' => 'string',
            'analyzer' => 'standard',
        ],
        'tags' => [
            'type' => 'object'
        ]
    );

    public function resourceable()
    {
        return $this->morphTo();
    }

    public function playlists()
    {
        return $this->belongsToMany(Playlist::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }


}
