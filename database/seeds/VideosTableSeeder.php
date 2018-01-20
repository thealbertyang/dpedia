<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\DB;

use App\Tag;
use App\Expert;
use App\Quote;
use App\Video;
use App\Resource;

class VideosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $data = [
            'title' => $title = $faker->name,
            'slug' => str_slug($title),
            'description' => 'This is a description.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data2 = [
            'pages' => '["curious-about","living-with"]',
            'video_url' => 'https://vimeo.com/183536824',
        ];

        $resource = Resource::create($data);
        //var_dump($resource);

        $video = Video::create(
            $data2
        );



        echo $resource->id; 
        $video->resource()->save($resource);
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
        $video->resource->tags()->sync($tagsToCreate);

        //Expert and quote
        //$expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => 'Los Angeles', 'state' => 'CA', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_leamacgrory_150x150.png']);
        //$video->expert()->associate($expert);

        //$video->save();



        $data = [
            'title' => $title = $faker->name,
            'slug' => str_slug($title),
            'description' => 'This is a description.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data2 = [
            'pages' => '["curious-about","living-with"]',
            'video_url' => 'https://vimeo.com/250482473',
        ];

        $resource = Resource::create($data);
        //var_dump($resource);

        $video = Video::create(
            $data2
        );



        echo $resource->id; 
        $video->resource()->save($resource);
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
        $video->resource->tags()->sync($tagsToCreate);

        //Expert and quote
        //$expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => 'Los Angeles', 'state' => 'CA', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_leamacgrory_150x150.png']);
        //$video->expert()->associate($expert);

        //$video->save();



        $data = [
            'title' => $title = $faker->name,
            'slug' => str_slug($title),
            'description' => 'This is a description.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data2 = [
            'pages' => '["curious-about","living-with"]',
            'video_url' => 'https://vimeo.com/250383662',
        ];

        $resource = Resource::create($data);
        //var_dump($resource);

        $video = Video::create(
            $data2
        );



        echo $resource->id; 
        $video->resource()->save($resource);
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
        $video->resource->tags()->sync($tagsToCreate);

        //Expert and quote
        //$expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => 'Los Angeles', 'state' => 'CA', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_leamacgrory_150x150.png']);
        //$video->expert()->associate($expert);

        //$video->save();
    }
}
