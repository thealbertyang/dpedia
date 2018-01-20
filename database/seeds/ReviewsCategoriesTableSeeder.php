<?php

use Illuminate\Database\Seeder;

class ReviewsCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('reviews_categories')->insert(
        [
            [
                'id' => 1,
                'title' => $title = 'Apps',
                'slug' => str_slug($title, '-'),
            ],
            [
                'id' => 2,
                'title' => $title = 'Clinical Trials',
                'slug' => str_slug($title, '-'),
            ],
            [
                'id' => 3,
                'title' => $title = 'Drugs',
                'slug' => str_slug($title, '-'),
            ],
            [
                'id' => 4,
                'title' => $title = 'Continuous Glucose Monitors',
                'slug' => str_slug($title, '-'),
            ],            
            [
                'id' => 5,
                'title' => $title = 'Insulin Pumps',
                'slug' => str_slug($title, '-'),
            ],
            [
                'id' => 6,
                'title' => $title = 'Accessories',
                'slug' => str_slug($title, '-'),
            ],
            [
                'id' => 7,
                'title' => $title = 'Nonprofits & Institutions',
                'slug' => str_slug($title, '-'),
            ],
        ]
        );

        /*DB::table('reviews_category_review')->insert(
        [
            ['review_id' => 1,
            'reviews_category_id' => 1],
            ['review_id' => 1,
            'reviews_category_id' => 2],
            ['review_id' => 1,
            'reviews_category_id' => 3],
            ['review_id' => 1,
            'reviews_category_id' => 4]
        ]
        );*/
    }
}
