<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\DB;

use App\Tag;
use App\Expert;
use App\Quote;
use App\Video;
use App\Resource;
use App\Review;
use App\Playlist;

class PlaylistsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $data = [
            'title' => $title = 'Summer Collection Videos',
            'status' => 'published',
            'type' => 'videos',
            'user_id' => 1,
        ];

        $resource = Playlist::create($data);

        //Tags - Create these tags if not exists 

        //If exists then use existing id
        $tags = ['logbook', 'hba1c', 'medical device', 'fda approved', 'digital apps', 'food', 'nutrition', 'tracking'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        //$video = video::find($resource->id);
        $resource->tags()->sync($tagsToCreate);
        $resource->resources()->sync([4,5,6]);
        
        //Expert and quote
        //$expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => 'Los Angeles', 'state' => 'CA', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_leamacgrory_150x150.png']);
        //$video->expert()->associate($expert);

        //$video->save();


        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    }
}
