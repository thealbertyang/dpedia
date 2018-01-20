<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Expert extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'occupation', 'credentials', 'highlights', 'about', 'affiliations', 'avatar_img', 'personal_url', 'address', 'city', 'state', 'zip', 'email',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        
    ];

    protected $appends = ['first_name', 'last_name', 'email', 'avatar_img', 'user'];

    public function getFirstNameAttribute()
    {
        return $this->user()->first()->first_name;
    }

    public function getLastNameAttribute()
    {
        return $this->user()->first()->last_name;
    }

    public function getEmailAttribute()
    {
        return $this->user()->first()->email;
    }

    public function getAvatarImgAttribute()
    {
        return $this->user()->first()->avatar_img;
    }

    public function getUserAttribute()
    {
        return $this->user()->first();
    }

    public function user()
    {
        return $this->morphOne(User::class,'userable');
    } 

    public function resources()
    {
        return $this->belongsToMany(Resource::class);
    }    

    public function quotes()
    {
        return $this->hasMany(Quote::class);
    }


}
