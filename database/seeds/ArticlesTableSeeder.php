<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\DB;

use App\Tag;
use App\Expert;
use App\Quote;
use App\Article;
use App\Resource;

class ArticlesTableSeeder extends Seeder 
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
            'header_img' => 'uploads/images/headers/hero_1.jpg',
            'description' => 'This is a description.',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data2 = [
            'pages' => '["curious-about","living-with"]',
            'body' => '<p>This is just an article with lorem ipsum.</p>',
        ];

        $resource = Resource::create($data);
        //var_dump($resource);

        $article = Article::create(
            $data2
        );



        echo $resource->id; 
        $article->resource()->save($resource);
        //Tags - Create these tags if not exists 

        //If exists then use existing id
        $tags = ['logbook', 'hba1c', 'medical device', 'fda approved', 'digital apps', 'food', 'nutrition', 'tracking'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        //$article = Article::find($resource->id);
        $article->resource->tags()->sync($tagsToCreate);

        //Expert and quote
        //$expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => 'Los Angeles', 'state' => 'CA', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_leamacgrory_150x150.png']);
        //$article->expert()->associate($expert);

        //$article->save();
    }
}
