<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\DB;

use App\Tag;
use App\Expert;
use App\Quote;
use App\Video;
use App\Resource;
use App\Page;
use App\Playlist;

class PagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {

        $data = [
            'title' => $title = "Home",
            'slug' => str_slug($title),
            'description' => 'This is a description.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $heroable = Playlist::find(1);


        $data2 = [
            'heroable_id' => $heroable->id,
            'heroable_type' => get_class($heroable),
        ];

        $resource = Resource::create($data);
        //var_dump($resource);

        $page = Page::create(
            $data2
        );



        echo $resource->id; 
        $page->resource()->save($resource);
        //Tags - Create these tags if not exists 

       
 

        //Expert and quote
        //$expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => 'Los Angeles', 'state' => 'CA', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_leamacgrory_150x150.png']);
        //$video->expert()->associate($expert);

        //$video->save();

        $data = [
            'title' => $title = "Curious About",
            'slug' => str_slug($title),
            'description' => 'This is a description.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $heroable = Playlist::find(1);


        $data2 = [
            'heroable_id' => $heroable->id,
            'heroable_type' => get_class($heroable),
        ];

        $resource = Resource::create($data);
        //var_dump($resource);

        $page = Page::create(
            $data2
        );



        echo $resource->id; 
        $page->resource()->save($resource);
        //Tags - Create these tags if not exists 

       
 

        //Expert and quote
        //$expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => 'Los Angeles', 'state' => 'CA', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_leamacgrory_150x150.png']);
        //$video->expert()->associate($expert);

        //$video->save();



            $data = [
            'title' => $title = "Living With",
            'slug' => str_slug($title),
            'description' => 'This is a description.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $heroable = Playlist::find(1);


        $data2 = [
            'heroable_id' => $heroable->id,
            'heroable_type' => get_class($heroable),
        ];

        $resource = Resource::create($data);
        //var_dump($resource);

        $page = Page::create(
            $data2
        );



        echo $resource->id; 
        $page->resource()->save($resource);
        //Tags - Create these tags if not exists 

       
 

        //Expert and quote
        //$expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => 'Los Angeles', 'state' => 'CA', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_leamacgrory_150x150.png']);
        //$video->expert()->associate($expert);

        //$video->save();


        $data = [
            'title' => $title = "Preventive Care",
            'slug' => str_slug($title),
            'description' => 'This is a description.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $heroable = Playlist::find(1);


        $data2 = [
            'heroable_id' => $heroable->id,
            'heroable_type' => get_class($heroable),
        ];

        $resource = Resource::create($data);
        //var_dump($resource);

        $page = Page::create(
            $data2
        );



        echo $resource->id; 
        $page->resource()->save($resource);
        //Tags - Create these tags if not exists 

       
 

        //Expert and quote
        //$expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => 'Los Angeles', 'state' => 'CA', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_leamacgrory_150x150.png']);
        //$video->expert()->associate($expert);

        //$video->save();


        $data = [
            'title' => $title = "Alternative Care",
            'slug' => str_slug($title),
            'description' => 'This is a description.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $heroable = Playlist::find(1);


        $data2 = [
            'heroable_id' => $heroable->id,
            'heroable_type' => get_class($heroable),
        ];

        $resource = Resource::create($data);
        //var_dump($resource);

        $page = Page::create(
            $data2
        );



        echo $resource->id; 
        $page->resource()->save($resource);
        //Tags - Create these tags if not exists 

       
 

        //Expert and quote
        //$expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => 'Los Angeles', 'state' => 'CA', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_leamacgrory_150x150.png']);
        //$video->expert()->associate($expert);

        //$video->save();
    
    }
}
