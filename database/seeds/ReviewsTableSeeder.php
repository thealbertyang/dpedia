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
        $resourceData = [
            'title' => $title = 'mySugr',
            'slug' => str_slug($title),
            'description' => 'mySugr is a logbook app for people with diabetes. The app helps users analyze statistics about how well they are managing their diabetes and is often found on lists of top diabetes apps.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'icon_img' => 'uploads/images/icons/Icon_mySugr_200x200.png',
            'url' => 'https://mysugr.com/',
            'ios_url' => 'https://app.adjust.com/oo9kkf',
            'body' => '<p>mySugr has an estimated HbA1c feature for glycated hemoglobin measurements. This feature provides an overall picture of average blood sugar levels based on personalized tracking statistics. It provides feedback, supports a user in their treatment goals, and securely  backs up all user information. mySugar is registered as a class 1 medical device and has a large user base, so you can be sure they have worked out many of the bugs found in newer apps.</p><blockquote><h6 class="heading">The pro version of the app ($2.99/month) includes:</h6><ul><li>Reminders about blood sugar</li><li>Print-ready readouts for doctor visits and personal records</li><li>Search features to find diabetes-friendly meals, places, and activities</li></ul></blockquote><h6 class="heading">What to watch out for</h6><p>All versions of mySugr have extensive features, but some elements are only available in the US or EU. mySugar recently merged with Roche, so the future of the app is unsure. The team reassures users that the app will still be supported, but often when an app is acquired it changes significantly.</p>',
            'google_url' => 'https://app.adjust.com/oo9kkf',
            'ios_rating' => 4.5,
            'google_rating' => 4.5,
            'sponsored' => true,
            'reviews_category_id' => 1,
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $review = Review::create(
            $data
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

        $resourceData = [
            'title' => $title = 'Glucose Buddy',
            'slug' => str_slug($title),
            'description' => 'Glucose Buddy is a logbook app that lets people keep close track of vital statistics, including:
                <ul>
                    <li>Blood glucose</li>
                    <li>Carbohydrate intake</li>
                    <li>Medication use</li>
                    <li>Activity levels</li>
                    <li>A1C</li>
                    <li>Blood pressure</li>
                    <li>Weight</li>
                </ul>',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'icon_img' => 'uploads/images/icons/Icon_glucoseBuddy_200x200.png',
            'url' => 'http://www.glucosebuddy.com',
            'ios_url' => 'https://itunes.apple.com/us/app/glucose-buddy-diabetes-tracker/id294754639?mt=8',
            'body' => '<p>Glucose Buddy uses notifications to remind users to test their blood sugar. The app provides a calendar with daily readouts to easily track blood sugar levels and doctor printouts to make visits even easier.  It is also consistently labeled as one of the best diabetes apps.
                </p><h6 class="heading">What to watch out for</h6><p>The app still consistently gets high reviews on Google Play and the App Store, but the last update was in 2012. Users occasionally report bugs with newer devices.</p>',
            'google_url' => 'https://play.google.com/store/apps/details?id=com.skyhealth.glucosebuddyfree&hl=en',
            'ios_rating' => 4.8,
            'google_rating' => 4.4,
            'sponsored' => true,
            'reviews_category_id' => 1,
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $review = Review::create(
            $data
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

        $resourceData = [
            'title' => $title = 'MyNetDiary',
            'slug' => str_slug($title),
            'description' => 'MyNetDiary is a food and exercise tracking app available on all platforms. Users can access the app from a smartphone, desktop, or tablet, and the data syncs itself to each one automatically. MyNetDiary&#39;s database contains over 755,000 foods – including items from name brands and fast food restaurants. With such an extensive database, it&#39;s relatively easy for users to find almost anything they&#39;re eating.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'icon_img' => 'uploads/images/icons/Icon_MyNetDiary_200x200.png',
            'url' => 'http://www.mynetdiary.com',
            'ios_url' => 'https://itunes.apple.com/us/app/calorie-counter-and-food-diary-by-mynetdiary/id287529757?mt=8',
            'body' => '<p>Users can track and plan their intake of fat, carbs, calories, protein, and nutrients along with exercise levels. The app produces special reports that show users how their diet, exercise, and medications affect them. The app also creates balanced nutrition plans for users based on their healthy weight goals. It has a community of like-minded users to help keep people motivated. MyNetDiary is a regular on the best diabetes app lists.</p><h6 class="heading">What to watch out for</h6><p>MyNetDiary is great at tracking food and exercise but isn’t explicitly made for diabetes. You won’t have a lot of the more detailed reporting and tracking found in diabetes-specific apps.</p>',
            'google_url' => 'https://play.google.com/store/apps/details?id=com.fourtechnologies.mynetdiary.ad&hl=en',
            'ios_rating' => 4.8,
            'google_rating' => 4.5,
            'sponsored' => true,
            'reviews_category_id' => 1,
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $review = Review::create(
            $data
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

        $resourceData = [
            'title' => $title = 'BG Monitor',
            'slug' => str_slug($title),
            'description' => 'BG Monitor tracks and analyzes relevant daily statistics for people with diabetes. By entering blood glucose levels and foods to be eaten, BG Monitor calculates how much insulin a person should expect to need. The app can also identify blood sugar trends and send notifications to users to make necessary adjustments.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'icon_img' => 'uploads/images/icons/Icon_BGMonitor_200x200.png',
            'url' => 'https://bg-monitor.com/',
            'ios_url' => '',
            'body' => '<h6 class="heading">What to watch out for</h6><p>BG Monitor is currently only available for Google Play</p>',
            'google_url' => 'https://play.google.com/store/apps/details?id=com.wonggordon.bgmonitor',
            'ios_rating' => null,
            'google_rating' => 4.4,
            'sponsored' => true,
            'reviews_category_id' => 1,
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $review = Review::create(
            $data
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

 
        $resourceData = [
            'title' => $title = 'GlucOracle',
            'slug' => str_slug($title),
            'description' => 'GlucOracle is a recently released app produced by Columbia University Medical Center that helps users predict blood sugar levels by showing what expected post-meal glucose levels will be.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'body' => '<p>One of the most powerful features of the app is an algorithm that mimics the user’s endocrine system. After about 7 days or 20 meals have been entered, GlucOracle can create personalized glucose forecasts and provide feedback on the nutritional content of meals.</p><h6 class="heading">What to watch out for</h6><p>GlucOracle uses crowdsourcing to determine the nutritional content of your meals, meaning it sends the picture to untrained workers, who in turn evaluate it and send back an estimate. Studies have shown this to be as accurate as estimates by dieticians, but there is still the possibility for human error.</p>',
            'url' => 'http://www.glucoracle.com/',
            'ios_url' => 'https://itunes.apple.com/us/app/glucoracle/id1190124199?mt=8',
            'google_url' => 'https://play.google.com/store/apps/details?id=coop.sassafras.glucoracle&hl=en',
            'ios_rating' => null,
            'google_rating' => 4,
            'icon_img' => 'uploads/images/icons/Icon_GlucOracle_200x200.png',
            'sponsored' => true,
            'reviews_category_id' => 1,
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $review = Review::create(
            $data
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
 
        $resourceData = [
            'title' => $title = 'Glooko',
            'slug' => str_slug($title),
            'description' => '',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'body' => 'With Glooko, patients can download their data from over 80 different meters to their mobile device. The app lets patients then add in information about food and exercise and stores it in the cloud. Healthcare providers can access this data and monitor patients remotely.',
            'url' => 'https://www.glooko.com/',
            'ios_url' => 'https://itunes.apple.com/us/app/glooko-track-diabetes-data/id471942748?mt=8',
            'google_url' => 'https://play.google.com/store/apps/details?id=com.glooko.logbook&hl=en',
            'ios_rating' => 3.5,
            'google_rating' => 4.1,
            'icon_img' => 'uploads/images/icons/Icon_Glooko_200x200.png',
            'sponsored' => true,
            'reviews_category_id' => 1,
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $review = Review::create(
            $data
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

 
        $resourceData = [
            'title' => $title = 'Health2Sync',
            'slug' => str_slug($title),
            'description' => '',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'body' => 'Health2Sync is a logbook that analyzes your entries and provides feedback and suggestions to help you interpret the data. Unlike many apps, it also has a social component that lets patients invite family and friends to assist in glucose control.',
            'url' => 'https://www.health2sync.com/',
            'ios_url' => 'https://itunes.apple.com/app/id806136243?mt=8',
            'google_url' => 'https://play.google.com/store/apps/details?id=com.h2sync.android.h2syncapp',
            'ios_rating' => 4.5,
            'google_rating' => 4.5,
            'icon_img' => 'uploads/images/icons/Icon_ Health2Sync_200x200.png',
            'sponsored' => true,
            'reviews_category_id' => 1,
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $review = Review::create(
            $data
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

 
        $resourceData = [
            'title' => $title = 'Glucosio',
            'slug' => str_slug($title),
            'description' => '',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'body' => 'A standard logbook for tracking different aspects of life with diabetes, but open source and with the option to open up anonymized data for researchers. The app hopes to produce an API soon that would let users and researchers play with the data.',
            'url' => 'https://www.glucosio.org',
            'ios_url' => '',
            'google_url' => 'https://play.google.com/store/apps/details?id=org.glucosio.android',
            'ios_rating' => null,
            'google_rating' => 4,
            'icon_img' => 'uploads/images/icons/Icon_ Glucosio_200x200.png',
            'sponsored' => true,
            'reviews_category_id' => 1,
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $review = Review::create(
            $data
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
 
        $resourceData = [
            'title' => $title = 'Clinical Trial by MD Connect',
            'slug' => str_slug($title),
            'description' => 'This study aims to test an investigational drug against NovoLog®/NovoRapid®. It is currently recruiting adults who use insulin glargine or insulin detemir for their diabetes mellitus. The main focus will be how blood sugar levels change over the course of the 54-week study.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'body' => '<b>Basic Inclusion Criteria:</b>
            <ul>
                <li>Over 18</li>
                <li>Insulin dependent</li>
                <li>Diagnosed with diabetes for at least a year</li>
                <li>Use insulin daily for type 1 or type 2 diabetes</li>
                <li>Use a combination of insulin that includes Novolog® or Humalog® AND one of the following: Lantus®, Abasaglar®, Basaglar®, Levemir®.</li>
            </ul><br/>
            <b>Location:</b> United States<br/>
            <b>Length:</b> 54 weeks<br/>',
            'url' => 'https://diabetesclinicaltrial.org',
            'ios_url' => '',
            'google_url' => '',
            'ios_rating' => null,
            'google_rating' => null,
            'icon_img' => 'uploads/images/icons/Icon_ Glucosio_200x200.png',
            'sponsored' => true,
            'reviews_category_id' => 2,
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $review = Review::create(
            $data
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
 
        $resourceData = [
            'title' => $title = 'Clinical Trial by TrialNet',
            'slug' => str_slug($title),
            'description' => 'Type 1 Diabetes TrialNet offers free screening for individuals related to people with diabetes. If the tests indicate that there may be a high risk, the individual may be eligible to take part in a study on diabetes prevention. Even for those not eligible for the study, TrialNet will monitor for early indicators of type 1 diabetes.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'body' => '<b>Basic Inclusion Criteria:</b>
            <ul>
                <li>Age 1-45 with a type 1 diabetic parent, brother, sister, or child.</li>
                <li>Age 1-20 with a type 1 diabetic niece, nephew, aunt, uncle, grandparent, half-brother, half-sister, or cousin</li>
            </ul>
            <b>Location:</b> Chicago, IL<br/>
            San Fransisco, CA<br/>
            Stanford, CA<br/>
            Indianapolis, IN<br/>
            Atlanta, GA<br/>
            New York, NY<br/>
            Kansas City, MO<br/>
            Seattle, WA<br/>
            Houston, TX<br/>
            Aurora, CO<br/>
            Gainesville, FL<br/>
            Miami, FL<br/>
            Minneapolis, MN<br/>
            Pittsburgh, PA<br/>
            Tampa, FL<br/>
            Dallas, TX<br/><br/>
            Nashville, TN<br/>
            New Haven, CT<br/>
            Malmö, SE<br/>
            Milan, MI<br/>
            Bristol, GB<br/>
            Helsinki, FI<br/>
            Neuherberg, DE<br/>
            Toronto, ON<br/>
            Parkville, VIC<br/>
            
            <b>Length:</b> N/A (screening)<br/>
            <b>Run by:</b> TrialNet',
            'url' => 'https://www.trialnet.org/',
            'ios_url' => '',
            'google_url' => '',
            'ios_rating' => null,
            'google_rating' => null,
            'icon_img' => 'uploads/images/icons/Icon_type1diabetestrialnet_330x200.png',
            'sponsored' => true,
            'reviews_category_id' => 2,
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $review = Review::create(
            $data
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
 
        $resourceData = [
            'title' => $title = 'Clinical Trial by AMCR Institute',
            'slug' => str_slug($title),
            'description' => 'The focus of this study is to test if a new study drug can help individuals with type 2 diabetes and elevated triglycerides prevent heart-related problems like heart attacks.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'body' => '<b>Basic Inclusion Criteria:</b> Check website<br/>
            <b>Location:</b> United States<br/>         
            <b>Length:</b> Check Website<br/>
            <b>Run by:</b> AMCR<br/>',
            'url' => 'http://www.amcrinstitute.com',
            'ios_url' => '',
            'google_url' => '',
            'ios_rating' => null,
            'google_rating' => null,
            'icon_img' => 'uploads/images/icons/Icon_amcrinstitute_330x200.png',
            'sponsored' => true,
            'reviews_category_id' => 2,
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $review = Review::create(
            $data
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
 
        $resourceData = [
            'title' => $title = 'Clinical Trial by Medtronic Diabetes',
            'slug' => str_slug($title),
            'description' => 'This study compares the effectiveness of Medtronic’s Hybrid Closed Loop system (HCL) with an individual’s current treatment within a home setting.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'body' => '<b>Basic Inclusion Criteria:</b> 
            <ul>
                <li>Age 2-80</li>
                <li>Type 1 Diabetic</li>
            </ul>
            <b>Location:</b> United States<br/>         
            <b>Length:</b> 6 months<br/>
            <b>Run by:</b> Medtronic<br/>',
            'url' => 'https://clinicaltrials.gov/ct2/show/NCT02748018',
            'ios_url' => '',
            'google_url' => '',
            'ios_rating' => null,
            'google_rating' => null,
            'icon_img' => 'uploads/images/icons/Icon_clinicaltrialsgov_330x200.png',
            'sponsored' => true,
            'reviews_category_id' => 2,
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $review = Review::create(
            $data
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
 
        $resourceData = [
            'title' => $title = 'Clinical Trial by Perry Renshaw (PI)',
            'slug' => str_slug($title),
            'description' => 'Run over the course of 12 weeks, this study aims to prove whether or not creatine supplementation can effectively treat depression in people with type 2 diabetes.',
            'header_img' => '',
            'status' => 'published',
            'user_id' => 1,
        ];

        $data = [
            'body' => '<b>Basic Inclusion Criteria:</b> 
            <ul>
                <li>Diagnosed with Major Depressive Disorder</li>
                <li>Diagnosed with Type 2 Diabetes</li>
            </ul>
            <b>Location:</b> Utah<br/>         
            <b>Length:</b> 12 weeks<br/>
            <b>Run by:</b> Salt Lake City, UT<br/>',
            'url' => 'https://healthcare.utah.edu/clinicaltrials/trial.php?id=FP00008571',
            'ios_url' => '',
            'google_url' => '',
            'ios_rating' => null,
            'google_rating' => null,
            'icon_img' => 'uploads/images/icons/Icon_clinicaltrialsgov_330x200.png',
            'sponsored' => true,
            'reviews_category_id' => 2,
        ];

        $resource = Resource::create($resourceData);
        //var_dump($resource);

        $review = Review::create(
            $data
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

    }
}
