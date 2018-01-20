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

class ReviewsTableSeeder extends Seeder
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
            'icon_img' => 'uploads/images/icons/Icon_mySugr_200x200.png',
            'url' => 'https://mysugr.com/',
            'ios_url' => 'https://app.adjust.com/oo9kkf',
            'body' => 'This is the review body.',
            'google_url' => 'https://app.adjust.com/oo9kkf',
            'ios_rating' => 4.5,
            'google_rating' => 4.5,
            'sponsored' => true,
            'reviews_category_id' => 1,
        ];

        $resource = Resource::create($data);
        //var_dump($resource);

        $review = Review::create(
            $data2
        );



        echo $resource->id; 
        $review->resource()->save($resource);
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
        $review->resource->tags()->sync($tagsToCreate);

        //Expert and quote
        //$expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => 'Los Angeles', 'state' => 'CA', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_leamacgrory_150x150.png']);
        //$video->expert()->associate($expert);

        //$video->save();


        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $data = [
            'title' => $title = $faker->name,
            'slug' => str_slug($title),
            'description' => 'This is a description.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data2 = [
            'icon_img' => 'uploads/images/icons/Icon_mySugr_200x200.png',
            'url' => 'https://mysugr.com/',
            'ios_url' => 'https://app.adjust.com/oo9kkf',
            'body' => 'This is the review body.',
            'google_url' => 'https://app.adjust.com/oo9kkf',
            'ios_rating' => 4.5,
            'google_rating' => 4.5,
            'sponsored' => true,
            'reviews_category_id' => 1,
        ];

        $resource = Resource::create($data);
        //var_dump($resource);

        $review = Review::create(
            $data2
        );



        echo $resource->id; 
        $review->resource()->save($resource);
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
        $review->resource->tags()->sync($tagsToCreate);

        //Expert and quote
        //$expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => 'Los Angeles', 'state' => 'CA', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_leamacgrory_150x150.png']);
        //$video->expert()->associate($expert);

        //$video->save();

        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $data = [
            'title' => $title = $faker->name,
            'slug' => str_slug($title),
            'description' => 'This is a description.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data2 = [
            'icon_img' => 'uploads/images/icons/Icon_mySugr_200x200.png',
            'url' => 'https://mysugr.com/',
            'ios_url' => 'https://app.adjust.com/oo9kkf',
            'body' => 'This is the review body.',
            'google_url' => 'https://app.adjust.com/oo9kkf',
            'ios_rating' => 4.5,
            'google_rating' => 4.5,
            'sponsored' => true,
            'reviews_category_id' => 2,
        ];

        $resource = Resource::create($data);
        //var_dump($resource);

        $review = Review::create(
            $data2
        );



        echo $resource->id; 
        $review->resource()->save($resource);
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
        $review->resource->tags()->sync($tagsToCreate);

        //Expert and quote
        //$expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => 'Los Angeles', 'state' => 'CA', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_leamacgrory_150x150.png']);
        //$video->expert()->associate($expert);

        //$video->save();

    }
}
