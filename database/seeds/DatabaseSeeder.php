<?php

use Illuminate\Database\Seeder;
use App\Resource;
use App\Review;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        

        $this->call(UsersTableSeeder::class); 
        //$this->call(TagsTableSeeder::class); 
        $this->call(ArticlesTableSeeder::class); 
        $this->call(VideosTableSeeder::class); 
        $this->call(ReviewsTableSeeder::class); 
        $this->call(ReviewsCategoriesTableSeeder::class); 
        $this->call(PlaylistsTableSeeder::class); 
        $this->call(PagesTableSeeder::class); 
        //$this->call(ExpertsTableSeeder::class); 
        //$this->call(QuotesTableSeeder::class); 

        //App\Article::deleteIndex();
        //App\Article::createIndex();
        //App\Article::putMapping();
        //App\Article::addAllToIndex();

       // App\Video::deleteIndex();
        //App\Video::createIndex();
       // App\Video::putMapping();
       // App\Video::addAllToIndex();

        if(Resource::typeExists()){
            Resource::deleteIndex();
        }

        if(Review::typeExists()){
            Review::deleteIndex();
        }

        //Resource::createIndex();
        Review::createIndex();

        Resource::putMapping();
        Review::putMapping();

        Resource::addAllToIndex();
        Review::addAllToIndex();        

    }
}
