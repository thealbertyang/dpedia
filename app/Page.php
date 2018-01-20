<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Elasticquent\ElasticquentTrait;
use App\Resource; 
use App\Expert;


class Page extends Model
{
    use Notifiable;
    use ElasticquentTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'slug', 'status', 'heroable_id', 'heroable_type',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        
    ];

    protected $appends = ['header_img', 'slug', 'status', 'title', 'user_id', 'description', 'hero', 'type'];


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

    public function getHeroAttribute()
    {
        $type = get_class($this->heroable()->first());

        switch($type){
            case 'App\Playlist':
                $hero = $this->heroable()->first();
                $heroType = $this->heroable()->first()->type;


                $results = $hero->toArray();

                if($heroType == 'videos'){
                    //For each resource add video attr
                    foreach($results['resources'] as $resourceK => $resourceV){
                        $class = $resourceV['resourceable_type'];
                        $resource = $class::find($resourceV['resourceable_id'])->toArray();
                        $results['resources'][$resourceK] = $resource;
                    }

                    //For each expert - add expert attributes
                    $results['expert'] = Expert::find($results['expert']['id']);
                }

                else if($heroType == 'articles'){
                    //For each resource add video attr
                    foreach($results['resources'] as $resourceK => $resourceV){
                        $class = $resourceV['resourceable_type'];
                        $resource = $class::find($resourceV['resourceable_id'])->toArray();
                        $results['resources'][$resourceK] = $resource;
                    }

                    //For each expert - add expert attributes
                    $results['expert'] = Expert::find($results['expert']['id']);
                }

                return $results;

                break;
            case 'App\Article':
                return $this->heroable()->first();
                break;
            case 'App\Video':
                return $this->heroable()->first();
                break;
        }

        
    }

    public function getTypeAttribute()
    {
        $type = get_class($this->heroable()->first());

        switch($type){
        	case 'App\Playlist':
        		return ['value'=> 'playlist', 'label' => 'Playlist'];
        		break;
        	case 'App\Article':
        		return ['value'=> 'article', 'label' => 'Article'];
        		break;
        	case 'App\Video':
        		return ['value'=> 'video', 'label' => 'Video'];
        		break;
        }
    }

    public function heroable()
    {
        return $this->morphTo();
    }

    public function resource()
    {
        return $this->morphOne(Resource::class,'resourceable');
    }

}
