<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'message', 'resource_id', 'expert_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        
    ];

    public function resource()
    {
        return $this->belongsTo(Resource::class, 'resource_id');
    }

    public function expert()
    {
        return $this->belongsTo(Expert::class, 'expert_id');
    }

}
