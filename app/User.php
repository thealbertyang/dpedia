<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'email', 'password', 'userable_type', 'userable_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $appends = ['role'];

     /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function getRoleAttribute()
    {

        $type = null;


        try {
            $type = get_class($this->userable()->first());
        }
        catch(\Illuminate\Database\QueryException $e){
            $type = null;
        }

        switch($type){
            case 'App\Expert':
                return json_decode(json_encode(['value'=> 'expert', 'label' => 'Expert']));
                break;            
            case 'App\Administrator':
                return json_decode(json_encode(['value'=> 'admin', 'label' => 'Administrator']));
                break;            
            case 'App\Member':
                return json_decode(json_encode(['value'=> 'member', 'label' => 'Member']));
                break;
            default:
                return json_decode(json_encode(['value'=> 'member', 'label' => 'Member']));
                break;
        }
    }

    public function userable()
    {
        return $this->morphTo();
    }

}
