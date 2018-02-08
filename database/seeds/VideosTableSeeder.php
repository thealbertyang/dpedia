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
        $resourceData = [
            'title' => $title = 'Diet and Exercise Proven To Help',
            'slug' => str_slug($title),
            'description' => 'We`ve been loving our new health program. Never felt better in all of our lives!',
            'header_img' => 'uploads/images/headers/DietExerciseHelp.jpg',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'pages' => '["curious-about","living-with"]',
            'video_url' => 'https://vimeo.com/183536824',
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $video = Video::create(
            $data
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

        //-------------------------------------------------------------------------------------------------------------------------

        $resourceData = [
            'title' => $title = 'The Top 35 foods that make diabetes and diet comfortable',
            'slug' => str_slug($title),
            'description' => 'Sustenance at ease. These foods will taste great as provide the proper nutrition to your body.',
            'header_img' => 'uploads/images/headers/Top35Food.jpg',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'pages' => '["curious-about","living-with"]',
            'video_url' => 'https://vimeo.com/183536824',
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $video = Video::create(
            $data
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

        //-------------------------------------------------------------------------------------------------------------------------        


        $resourceData = [
            'title' => $title = 'The first 30 days of living with diabetes',
            'slug' => str_slug($title),
            'description' => 'What happens in the first 30 days of living with diabetes? Find out!',
            'header_img' => 'uploads/images/headers/slide2.jpg',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'pages' => '["curious-about","living-with"]',
            'video_url' => 'https://vimeo.com/183536824',
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $video = Video::create(
            $data
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

        //-------------------------------------------------------------------------------------------------------------------------

        $resourceData = [
            'title' => $title = 'Self-care and management of diabetes',
            'slug' => str_slug($title),
            'description' => 'It can be difficult at first, but you will get better with time. Learn the basics of self care and management of diabetes.',
            'header_img' => 'uploads/images/headers/Self-care.jpg',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'pages' => '["curious-about","living-with"]',
            'video_url' => 'https://vimeo.com/183536824',
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $video = Video::create(
            $data
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

        //-------------------------------------------------------------------------------------------------------------------------

    }
}
