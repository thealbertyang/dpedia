<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
use App\Tag;
use App\Resource;
use App\Expert;
use App\Quote;
use Illuminate\Support\Facades\DB;

class ResourcesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {

        $id = $id = DB::table('resources')->insertGetId(
        [
            'slug' => 'mysugr',
            'title' => 'mySugr',
            'description' => 'mySugr is a logbook app for people with diabetes. The app helps users analyze statistics about how well they are managing their diabetes and is often found on lists of top diabetes apps.',
            'body' => '<p>mySugr has an estimated HbA1c feature for glycated hemoglobin measurements. This feature provides an overall picture of average blood sugar levels based on personalized tracking statistics. It provides feedback, supports a user in their treatment goals, and securely  backs up all user information. mySugar is registered as a class 1 medical device and has a large user base, so you can be sure they have worked out many of the bugs found in newer apps.</p><blockquote><h6 class="heading">The pro version of the app ($2.99/month) includes:</h6><ul><li>Reminders about blood sugar</li><li>Print-ready readouts for doctor visits and personal records</li><li>Search features to find diabetes-friendly meals, places, and activities</li></ul></blockquote><h6 class="heading">What to watch out for</h6><p>All versions of mySugr have extensive features, but some elements are only available in the US or EU. mySugar recently merged with Roche, so the future of the app is unsure. The team reassures users that the app will still be supported, but often when an app is acquired it changes significantly.</p>',
            'category_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_mySugr_200x200.png',
            'url' => 'https://mysugr.com/',
            'ios_url' => 'https://app.adjust.com/oo9kkf',
            'google_url' => 'https://app.adjust.com/y84ghz',
            'ios_rating' => '4.5',
            'google_rating' => '4.5',
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 2,
        ]
        );

        //Tags - Create these tags if not exists 

        //If exists then use existing id
        $tags = ['logbook', 'hba1c', 'medical device', 'fda approved', 'digital apps', 'food', 'nutrition', 'tracking'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => 'Los Angeles', 'state' => 'CA', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_leamacgrory_150x150.png']);
        $resource->expert()->associate($expert);

        $quote = Quote::create(['message' => 'Logbook apps help keep track of numbers related to diabetes management, like HbA1c. Some, like mySugr also give reminders.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();

        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------



        $id = $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Glucose Buddy',
            'slug' => str_slug($title, '-'),
            'description' => 'Glucose Buddy is a logbook app that lets people keep close track of vital statistics, including:
                <ul>
                    <li>Blood glucose</li>
                    <li>Carbohydrate intake</li>
                    <li>Medication use</li>
                    <li>Activity levels</li>
                    <li>A1C</li>
                    <li>Blood pressure</li>
                    <li>Weight</li>
                </ul>
                ',
            'body' => '<p>Glucose Buddy uses notifications to remind users to test their blood sugar. The app provides a calendar with daily readouts to easily track blood sugar levels and doctor printouts to make visits even easier.  It is also consistently labeled as one of the best diabetes apps.
                </p><h6 class="heading">What to watch out for</h6><p>The app still consistently gets high reviews on Google Play and the App Store, but the last update was in 2012. Users occasionally report bugs with newer devices.</p>',
            'category_id' => 1,
            'expert_id' => 1,
            'url' => 'http://www.glucosebuddy.com',
            'ios_url' => 'https://itunes.apple.com/us/app/glucose-buddy-diabetes-tracker/id294754639?mt=8',
            'google_url' => 'https://play.google.com/store/apps/details?id=com.skyhealth.glucosebuddyfree&hl=en',
            'ios_rating' => '4.8',
            'google_rating' => '4.4',
            'icon_img' => 'uploads/images/icons/Icon_glucoseBuddy_200x200.png',
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 4,

        ]
        );

        $tags = ['logbook', 'medication log', 'food log', 'exercise log', 'alerts', 'digital apps', 'food', 'nutrition', 'medication tracking', 'tracking'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Billy', 'last_name' => 'Nagel'], ['credentials' => 'MD', 'city' => 'Los Angeles', 'state' => 'CA', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_billynagel_150x150.png']);
        $resource->expert()->associate($expert);

        $quote = Quote::create(['message' => 'Like most logbook apps, Glucose Buddy lets you record measurements and numbers as you manage your diabetes.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();

        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------


        
 
        $id = $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'MyNetDiary',
            'slug' => str_slug($title, '-'),
            'description' => 'MyNetDiary is a food and exercise tracking app available on all platforms. Users can access the app from a smartphone, desktop, or tablet, and the data syncs itself to each one automatically. MyNetDiary&#39;s database contains over 755,000 foods – including items from name brands and fast food restaurants. With such an extensive database, it&#39;s relatively easy for users to find almost anything they&#39;re eating.',
            'body' => '<p>Users can track and plan their intake of fat, carbs, calories, protein, and nutrients along with exercise levels. The app produces special reports that show users how their diet, exercise, and medications affect them. The app also creates balanced nutrition plans for users based on their healthy weight goals. It has a community of like-minded users to help keep people motivated. MyNetDiary is a regular on the best diabetes app lists.</p><h6 class="heading">What to watch out for</h6><p>MyNetDiary is great at tracking food and exercise but isn’t explicitly made for diabetes. You won’t have a lot of the more detailed reporting and tracking found in diabetes-specific apps.</p>',
            'category_id' => 1,
            'expert_id' => 1,
            'url' => 'http://www.mynetdiary.com',
            'ios_url' => 'https://itunes.apple.com/us/app/calorie-counter-and-food-diary-by-mynetdiary/id287529757?mt=8',
            'google_url' => 'https://play.google.com/store/apps/details?id=com.fourtechnologies.mynetdiary.ad&hl=en',
            'ios_rating' => '4.8',
            'google_rating' => '4.5',
            'icon_img' => 'uploads/images/icons/Icon_MyNetDiary_200x200.png',
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 2,


        ]
        );

        $tags = ['logbook', 'exercise', 'nutrition', 'non-diabetes specific', 'digital apps', 'food', 'nutrition'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Yvonne', 'last_name' => 'Summers'], ['credentials' => 'MD, PhD', 'city' => '', 'state' => '', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_yvonnesummers_150x150.png']);
        $resource->expert()->associate($expert);

        $quote = Quote::create(['message' => 'Tracking your food is crucial to managing diabetes. Even though apps like MyNetDiary aren’t made specifically for people with diabetes, they can help you monitor your food.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();


        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------


        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'BG Monitor',
            'slug' => str_slug($title, '-'),
            'description' => 'BG Monitor tracks and analyzes relevant daily statistics for people with diabetes. By entering blood glucose levels and foods to be eaten, BG Monitor calculates how much insulin a person should expect to need. The app can also identify blood sugar trends and send notifications to users to make necessary adjustments.',
            'body' => '<h6 class="heading">What to watch out for</h6><p>BG Monitor is currently only available for Google Play</p>',
            'category_id' => 1,
            'expert_id' => 1,
            'url' => 'https://bg-monitor.com/',
            'ios_url' => '',
            'google_url' => 'https://play.google.com/store/apps/details?id=com.wonggordon.bgmonitor',
            'ios_rating' => '',
            'google_rating' => '4.4',
            'icon_img' => 'uploads/images/icons/Icon_BGMonitor_200x200.png',
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 5,


        ]
        );

        $tags = ['android only', 'reminders', 'reports',' digital apps', 'food', 'nutrition'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Evan', 'last_name' => 'Yates'], ['credentials' => 'MD', 'city' => '', 'state' => '', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_evanyates_150x150.png']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Logging blood glucose and food is very important for managing your diabetes. Digital apps can be a big help with that.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------


        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'GlucOracle',
            'slug' => str_slug($title, '-'),
            'description' => 'GlucOracle is a recently released app produced by Columbia University Medical Center that helps users predict blood sugar levels by showing what expected post-meal glucose levels will be.',
            'body' => '<p>One of the most powerful features of the app is an algorithm that mimics the user’s endocrine system. After about 7 days or 20 meals have been entered, GlucOracle can create personalized glucose forecasts and provide feedback on the nutritional content of meals.</p><h6 class="heading">What to watch out for</h6><p>GlucOracle uses crowdsourcing to determine the nutritional content of your meals, meaning it sends the picture to untrained workers, who in turn evaluate it and send back an estimate. Studies have shown this to be as accurate as estimates by dieticians, but there is still the possibility for human error.</p>',
            'category_id' => 1,
            'expert_id' => 1,
            'url' => 'http://www.glucoracle.com/',
            'ios_url' => 'https://itunes.apple.com/us/app/glucoracle/id1190124199?mt=8',
            'google_url' => 'https://play.google.com/store/apps/details?id=coop.sassafras.glucoracle&hl=en',
            'ios_rating' => '',
            'google_rating' => '4',
            'icon_img' => 'uploads/images/icons/Icon_GlucOracle_200x200.png',
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 6,


        ]
        );

        $tags = ['forecasting', 'predictions', 'preventive', 'digital apps', 'food', 'nutrition'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Philippa', 'last_name' => 'Daelman'], ['credentials' => 'MD, FACS', 'city' => '', 'state' => '', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_philippadaelman_150x150.png']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Knowing what your glucose levels will be after a meal can make calculating insulin doses easier. GlucOracle is great because it can help predict what those levels will be.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Glooko',
            'slug' => str_slug($title, '-'),
            'description' => 'With Glooko, patients can download their data from over 80 different meters to their mobile device. The app lets patients then add in information about food and exercise and stores it in the cloud. Healthcare providers can access this data and monitor patients remotely.',
            'body' => '<p></p>',
            'category_id' => 1,
            'expert_id' => 1,
            'url' => 'https://www.glooko.com/',
            'ios_url' => 'https://itunes.apple.com/us/app/glooko-track-diabetes-data/id471942748?mt=8',
            'google_url' => 'https://play.google.com/store/apps/details?id=com.glooko.logbook&hl=en',
            'ios_rating' => '3.5',
            'google_rating' => '4.1',
            'icon_img' => 'uploads/images/icons/Icon_Glooko_200x200.png',
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 1,


        ]
        );

        $tags = ['reminders', 'logbook', 'exercise', 'food', 'device sync', 'remote monitoring', 'digital apps', 'food', 'nutrition'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);       

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Carol', 'last_name' => 'Lee'], ['credentials' => 'MD', 'city' => '', 'state' => '', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_carollee_150x150.png']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Many apps require you to manually enter different numbers when you manage your diabetes. Glooko actually lets you automatically download the data and keep an eye on everything.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Health2Sync',
            'slug' => str_slug($title, '-'),
            'description' => 'Health2Sync is a logbook that analyzes your entries and provides feedback and suggestions to help you interpret the data. Unlike many apps, it also has a social component that lets patients invite family and friends to assist in glucose control.',
            'body' => '<p></p>',
            'category_id' => 1,
            'expert_id' => 1,
            'url' => 'https://www.health2sync.com/',
            'ios_url' => 'https://itunes.apple.com/app/id806136243?mt=8',
            'google_url' => 'https://play.google.com/store/apps/details?id=com.h2sync.android.h2syncapp',
            'ios_rating' => '4.5',
            'google_rating' => '4.5',
            'icon_img' => 'uploads/images/icons/Icon_ Health2Sync_200x200.png',
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 46,


        ]
        );

        $tags = ['logbook', 'social', 'feedback', 'analysis', 'digital apps', 'food', 'nutrition'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate); 

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Gregory', 'last_name' => 'Scott'], ['credentials' => 'MD', 'city' => '', 'state' => '', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_gregoryscott_150x150.png']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Having a good support system is crucial to successfully managing your diabetes. Health2Sync is one of the only logbooks that takes that into account, letting you add friends and family.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Glucosio',
            'slug' => str_slug($title, '-'),
            'description' => 'A standard logbook for tracking different aspects of life with diabetes, but open source and with the option to open up anonymized data for researchers. The app hopes to produce an API soon that would let users and researchers play with the data.',
            'body' => '<p></p>',
            'category_id' => 1,
            'expert_id' => 1,
            'url' => 'https://www.glucosio.org',
            'ios_url' => '',
            'google_url' => 'https://play.google.com/store/apps/details?id=org.glucosio.android',
            'ios_rating' => '',
            'google_rating' => '4',
            'icon_img' => 'uploads/images/icons/Icon_ Glucosio_200x200.png',
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 7,


        ]
        );

        $tags = ['reminders', 'logbook', 'research', 'digital apps', 'food', 'nutrition'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate); 

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Billy', 'last_name' => 'Nagel'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Logbooks are important to track your own efforts at managing diabetes. However, they also contain a lot of information that can be useful for researchers, which is why Glucosio has an option to share your data.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Clinical Trial by MD Connect',
            'slug' => str_slug($title, '-'),
            'description' => 'This study aims to test an investigational drug against NovoLog®/NovoRapid®. It is currently recruiting adults who use insulin glargine or insulin detemir for their diabetes mellitus. The main focus will be how blood sugar levels change over the course of the 54-week study.',
            'body' => '<b>Basic Inclusion Criteria:</b>
            <ul>
                <li>Over 18</li>
                <li>Insulin dependent</li>
                <li>Diagnosed with diabetes for at least a year</li>
                <li>Use insulin daily for type 1 or type 2 diabetes</li>
                <li>Use a combination of insulin that includes Novolog® or Humalog® AND one of the following: Lantus®, Abasaglar®, Basaglar®, Levemir®.</li>
            </ul><br/>
            <b>Location:</b> United States<br/>
            <b>Length:</b> 54 weeks<br/>
            ',
            'category_id' => 2,
            'expert_id' => 1,
            'url' => 'https://diabetesclinicaltrial.org',
            'icon_img' => 'uploads/images/icons/Icon_diabetesclinicaltrial_330x200.png',
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 17,

        ]
        );

        $tags = ['diabetes', 'type 1', 'type 2', 'drug trial', 'blood sugar level'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);


        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Evan', 'last_name' => 'Yates'], ['credentials' => 'MD', 'city' => '', 'state' => '', 'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_evanyates_150x150.png']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'This study is testing out a new type of drug to help treat diabetes.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 

        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Clinical Trial by TrialNet',
            'slug' => str_slug($title, '-'),
            'description' => 'Type 1 Diabetes TrialNet offers free screening for individuals related to people with diabetes. If the tests indicate that there may be a high risk, the individual may be eligible to take part in a study on diabetes prevention. Even for those not eligible for the study, TrialNet will monitor for early indicators of type 1 diabetes.',
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
            <b>Run by:</b> TrialNet
            ',
            'category_id' => 2,
            'expert_id' => 1,
            'url' => 'https://www.trialnet.org/',
            'icon_img' => 'uploads/images/icons/Icon_type1diabetestrialnet_330x200.png',
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 44,

        ]
        );

        $tags = ['screening', 'preventive', 'diabetes', 'type 1', 'prevention'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Carol', 'last_name' => 'Lee'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'This study aims to find out more about diabetes prevention and early indicators.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Clinical Trial by AMCR Institute',
            'slug' => str_slug($title, '-'),
            'description' => 'The focus of this study is to test if a new study drug can help individuals with type 2 diabetes and elevated triglycerides prevent heart-related problems like heart attacks.',
            'body' => '<b>Basic Inclusion Criteria:</b> Check website<br/>
            <b>Location:</b> United States<br/>         
            <b>Length:</b> Check Website<br/>
            <b>Run by:</b> AMCR<br/>
            ',
            'category_id' => 2,
            'expert_id' => 1,
            'url' => 'http://www.amcrinstitute.com',
            'icon_img' => 'uploads/images/icons/Icon_amcrinstitute_330x200.png',
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 3,

        ]
        );

        $tags = ['diabetes', 'type 2', 'heart attack', 'heart condition'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Gregory', 'last_name' => 'Scott'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'This study tries to help people with two dangerous conditions: T2 diabetes and elevated triglycerides (a type of fat).', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Clinical Trial by Medtronic Diabetes',
            'slug' => str_slug($title, '-'),
            'description' => 'This study compares the effectiveness of Medtronic’s Hybrid Closed Loop system (HCL) with an individual’s current treatment within a home setting.',
            'body' => '<b>Basic Inclusion Criteria:</b> 
            <ul>
                <li>Age 2-80</li>
                <li>Type 1 Diabetic</li>
            </ul>
            <b>Location:</b> United States<br/>         
            <b>Length:</b> 6 months<br/>
            <b>Run by:</b> Medtronic<br/>
            ',
            'category_id' => 2,
            'expert_id' => 1,
            'url' => 'https://clinicaltrials.gov/ct2/show/NCT02748018',
            'icon_img' => 'uploads/images/icons/Icon_clinicaltrialsgov_330x200.png',
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 27,

        ]
        );

        $tags = ['hybrid closed loop system', 'hcl', 'home setting trial', 'diabetes, type 1'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);

        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'This study is aimed at finding out how well a Medtronic product works.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Clinical Trial by Perry Renshaw (PI)',
            'slug' => str_slug($title, '-'),
            'description' => 'Run over the course of 12 weeks, this study aims to prove whether or not creatine supplementation can effectively treat depression in people with type 2 diabetes.',
            'body' => '<b>Basic Inclusion Criteria:</b> 
            <ul>
                <li>Diagnosed with Major Depressive Disorder</li>
                <li>Diagnosed with Type 2 Diabetes</li>
            </ul>
            <b>Location:</b> Utah<br/>         
            <b>Length:</b> 12 weeks<br/>
            <b>Run by:</b> Salt Lake City, UT<br/>
            ',
            'category_id' => 2,
            'expert_id' => 1,
            'url' => 'https://healthcare.utah.edu/clinicaltrials/trial.php?id=FP00008571',
            'icon_img' => 'uploads/images/icons/Icon_clinicaltrialsgov_330x200.png',
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 14,

        ]
        );

        $tags = ['creatine', 'diabetes', 'depression', 'type 2', 'supplementation'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Yvonne', 'last_name' => 'Summers'], ['credentials' => 'MD, PhD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Creatine is often used as a fitness supplement, but this study wants to see if it can help treat depression in people with type 2 diabetes.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Clinical Trial by University of Alabama at Birmingham',
            'slug' => str_slug($title, '-'),
            'description' => 'This study looks at whether or not GABA can protect pancreatic beta cells and reduce inflammation in people with type 1 diabetes.',
            'body' => '<b>Basic Inclusion Criteria:</b> 
            <ul>
                <li>Age 4-18 years</li>
                <li>Diagnosed with type 1 diabetes</li>
                <li>Diagnosed less than 5 weeks previous to study enrollment</li>
            </ul>
            <b>Location:</b> Birmingham, Alabama<br/>         
            <b>Length:</b> 12 months<br/>
            <b>Run by:</b> University of Alabama at Birmingham, Janssen Pharmaceuticals, Juvenile Diabetes Research Foundation, NOW Foods, Diamyd Inc<br/>
            ',
            'category_id' => 2,
            'expert_id' => 1,
            'url' => 'https://clinicaltrials.gov/ct2/show/NCT02002130',
            'icon_img' => 'uploads/images/icons/Icon_clinicaltrialsgov_330x200.png',
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 45,

        ]
        );

        $tags = ['GABA', 'diabetes', 'supplementation', 'type 1', 'inflammation reduction'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);        

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Phillipa', 'last_name' => 'Daelman'], ['credentials' => 'MD, FACS', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'GABA is typically used to help with anxiety, sleep, PMS, or mood. This study looks at whether or not GABA can also helps protect the cells in the pancreas for people with type 1 diabetes.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Clinical Trial by Ageless Regenerative Institute',
            'slug' => str_slug($title, '-'),
            'description' => 'This study aims to determine if the intravenous delivery of autologous adipose-derived stromal cells is a safe and effective treatment for peple with type 2 diabetes.',
            'body' => '<b>Basic Inclusion Criteria:</b> 
            <ul>
                <li>Age 18-80</li>
                <li>Diagnosed with type 2 diabetes</li>
                <li>BMI ≤35㎏/㎡</li>
                <li>Fast blood glucose (FBG)≥7.0 mmol/L, and Hemoglobin A1c (HgbA1c)≥7％</li>
                <li>Current on recommended cancer screenings</li>
            </ul>
            <b>Location:</b> United States<br/>         
            <b>Length:</b> 3-6 months<br/>
            <b>Run by:</b> Ageless Regenerative Institute<br/>
            ',
            'category_id' => 2,
            'expert_id' => 1,
            'url' => 'https://clinicaltrials.gov/ct2/show/record/NCT01453751',
            'icon_img' => 'uploads/images/icons/Icon_clinicaltrialsgov_330x200.png',  
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 16,

        ]
        );

        $tags = ['stromal cells', 'diabetes', 'type 2'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);        

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Gregory', 'last_name' => 'Scott'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'In particular, this study wants to see if stem cells could be a safe and effective treatment for type 2 diabetes.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Clinical Trial by Hackensack University Medical Center',
            'slug' => str_slug($title, '-'),
            'description' => 'This study aims to find adverse effects of Stem Cell Educator therapy in people with type 1 diabetes',
            'body' => '<b>Basic Inclusion Criteria:</b> 
            <ul>
                <li>Over 18 years old</li>
                <li>Diagnosed with type 1 diabetes</li>
                <li>Fasting C-peptide level > 0.3 ng/ml</li>
                <li>Adequate venous access for apheresis</li>
            </ul>
            <b>Location:</b> Hackensack, New Jersey, United States<br/>         
            <b>Length:</b> 12 months<br/>
            <b>Run by:</b> Hackensack University Medical Center<br/>
            ',
            'category_id' => 2,
            'expert_id' => 1,
            'url' => 'https://clinicaltrials.gov/ct2/show/NCT02624804',
            'icon_img' => 'uploads/images/icons/Icon_clinicaltrialsgov_330x200.png',
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 13,

        ]
        );

        $tags = ['stem cells', 'stem cell educator therapy', 'type 1 diabetes'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);        


        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Billy', 'last_name' => 'Nagel'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'There are several ways that stem cells can be used to treat conditions. Stem Cell Educator Therapy is one of those, and this study will try to find out if it can help people with type 1 diabetes.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Levemir (insulin detemir)',
            'slug' => str_slug($title, '-'),
            'description' => 'One of two major long-lasting insulins made to control high blood sugar, Levemir is the trade name for insulin detemir and is produced by Novo Nordisk. The drug is FDA certified to treat type 1 and type 2 diabetes mellitus in adults, as well as type 2 diabetes mellitus in children over 2 and pregnant women.',
            'body' => '<b>Benefits:</b><p>Levemir is a long-lasting insulin that potentially provides a flatter time-action profile and duration of action than intermediate acting insulins. This makes for easier glycemic control over longer periods of time, but may also require shorter-acting insulins throughout the day. </p>
                <br/>
                <p>Studies have shown that Levemir has resulted in less weight gain compared to insulin glargine (the other major long-lasting insulin), but a higher rate of injection site reactions. <a href="#cite_note-1"><sup>[1]</sup></a></p>
                <br/><br/>

                <b>How It&#39;s Taken</b>
                <p>Levemir is taken by a subcutaneous injection once or twice a day.</p>
                <br/>

                <b>Effectiveness</b>
                <p>Studies have shown that Levemir is generally as effective as other long-lasting insulins. <a href="#cite_note-2"><sup>[2]</sup></a></a></p>
                <br/>

                <b>Side Effects & Drawbacks</b>
                <p>Severe hypoglycemia was the most common side effect reported in clinical trials. Other side effects include: reactions at the injection site, itching, rash, serious allergic reactions (whole body reactions), skin thickening or pits at the injection site (lipodystrophy), weight gain, swelling of your hands and feet and if taken with thiazolidinediones (TZDs) possible heart failure.</p>
                <p>If you have trouble breathing, shortness of breath, fast heartbeat, swelling of your face, tongue, or throat, sweating, extreme drowsiness, dizziness, or confusion, get emergency medical help.</p>
                <br/>
                <b>Prescription Needed</b>
                <p>Yes</p>
                <br/>
                <b>References</b>
                <ol>
                    <li id="cite_note-1"><a href="https://www.ncbi.nlm.nih.gov/pubmedhealth/PMH0013921/">https://www.ncbi.nlm.nih.gov/pubmedhealth/PMH0013921/</a></li>
                    <li id="cite_note-2"><a href="http://www.novo-pi.com/levemir.pdf">http://www.novo-pi.com/levemir.pdf</a></li>
                </ol>
            ',
            'category_id' => 3,
            'expert_id' => 1,
            'sponsored' => (bool)random_int(0, 1),
            'icon_img' => 'uploads/images/icons/Icon_levemir_330x200.png',
            'related_resource_id' => 18,

        ]
        );

        $tags = ['Long-lasting insulin', 'insulin', 'Novo Nordisk', 'FDA certified'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);


        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Joseph S.', 'last_name' => 'Alpert'], ['credentials' => 'MD', 'city' => '', 'state' => '', 'avatar_img' => 'uploads/images/avatars/img_expert_sm_150x150_alpert.png']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Insulin therapy is still the cornerstone of a therapeutic program for most people with diabetes.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Humalog (Insulin lispro)',
            'slug' => str_slug($title, '-'),
            'description' => 'Humalog is the trade name for insulin lispro, a fast-acting insulin that takes effect within 5 to 15 minutes. It is meant to be taken around meals and lasts for a relatively short amount of time – at most around 3-5 hours. This type of insulin is primarily used by people with type 1 diabetes, but can also be prescribed to people with type 2 diabetes to manage their blood sugar level. This insulin acts slightly slower than the other major fast-acting insulin NovoLog.',
            'body' => '',
            'category_id' => 3,
            'expert_id' => 1,
            'sponsored' => (bool)random_int(0, 1),
            'icon_img' => 'uploads/images/icons/Icon_humalog_330x200.png',
            'related_resource_id' => 19,

        ]
        );

        $tags = ['Eli Lilly', 'fast-acting insulin'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);


        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Evan', 'last_name' => 'Yates'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'This isn’t the only insulin you’ll need, but it is generally used to help manage blood sugar levels around meals.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'NovoLog (Insulin aspart)',
            'slug' => str_slug($title, '-'),
            'description' => 'The fast-acting insulin NovoLog (Insulin lispro) is often prescribed to people with type 1 or type 2 diabetes. Patients at least 2 years old can use the drug to help manage their blood sugar levels around meals. This insulin acts slightly quicker than Humalog, the other major fast-acting insulin, and can be diluted with a special diluting medium if necessary.',
            'body' => '',
            'category_id' => 3,
            'expert_id' => 1,
            'sponsored' => (bool)random_int(0, 1),
            'icon_img' => 'uploads/images/icons/Icon_novolog_330x200.png',            
            'related_resource_id' => 17,

        ]
        );

        $tags = ['Fast-acting insulin', 'Novo Nordisk'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Carol', 'last_name' => 'Lee'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Novolog is the trade name for a type of fast-acting insulin used to manage blood sugar around meals.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Jardiance (empagliflozin)',
            'slug' => str_slug($title, '-'),
            'description' => 'Jardiance can be used by people with type 2 diabetes to lower their blood sugar level and lower the risk of cardiovascular death by helping the kidneys remove glucose from the bloodstream. The drug is taken orally and must be combined with the proper diet and exercise to work effectively. ',
            'body' => '',
            'category_id' => 3,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_jardiance_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 21,

        ]
        );

        $tags = ['Non-insulin medication', 'Boehringer Ingelheim Pharmaceuticals'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Jardiance is one of the non-insulin drugs that can help lower blood sugar levels.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Humulin R (insulin regular)',
            'slug' => str_slug($title, '-'),
            'description' => 'Humulin is the trade name for a variety of short-acting insulins called insulin regular. Produced by Eli Lilly and Company, the drug is available as an injectable and comes as standard U-100 insulin as well as a concentrated U-500 insulin.
',
            'body' => '',
            'category_id' => 3,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_humulinr_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 20,

        ]
        );

        $tags = ['Eli Lilly', 'short-acting insulin'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);
        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Yvonne', 'last_name' => 'Summers'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Humulin R is a brand name for a type of short-acting insulin.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        /*
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Metformin',
            'slug' => str_slug($title, '-'),
            'description' => 'Metformin is often one of the first medications prescribed to people with type 2 diabetes to help control blood sugar levels. It can be used with proper diet, exercise, and other medications to decrease sugar production by the liver and sugar absorption by the stomach and intestines.',
            'body' => '',
            'category_id' => 3,
            'expert_id' => 1,
            'sponsored' => (bool)random_int(0, 1),

        ]
        );

        $tags = ['Non-insulin medication', 'type 2 diabetes'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Bridget', 'last_name' => 'Chambers'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Metformin is one of the standards medicines prescribed to people with type 2 diabetes.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();


        */
        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        /*
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Glimepiride',
            'slug' => str_slug($title, '-'),
            'description' => 'Glimepiride is the generic name for medication used to control high blood sugar in people with type 2 diabetes. This drug and other sulfonylureas improve secretion of insulin into the blood by the pancreas.',
            'body' => '',
            'category_id' => 3,
            'expert_id' => 1,
            'sponsored' => (bool)random_int(0, 1),

        ]
        );

        $tags = ['Non-insulin medication'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);

        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Ana', 'last_name' => 'Pena'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'This medicine is for people with type 2 diabetes because it relies on a pancreas that can produce at least a little insulin.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();


        */
        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Soliqua 100/33 (insulin glargine & lixisenatide injection)',
            'slug' => str_slug($title, '-'),
            'description' => 'Soliqua 100/33 is a combination of the long-acting insulin insulin glargine and the non-insulin medicine lixisenatide. Together, the drugs help people with type 2 diabetes manage blood sugar levels by providing long-acting insulin that lasts up to 24 hours and helping the pancreas create insulin more efficiently.',
            'body' => '',
            'category_id' => 3,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_sooil_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 16,

        ]
        );

        $tags = ['Sanofi-aventis', 'long-acting insulin', 'non-insulin medicine', 'type 2 diabetes'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);
        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Billy', 'last_name' => 'Nagel'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Soliqua 100/33 is a combination of insulin with another type of medication. These two are combined to help manage diabetes through two different functions of the body.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Dexcom G5',
            'slug' => str_slug($title, '-'),
            'description' => 'The Dexcom G5 is the successor to the Dexcom G4 Continuous Glucose Monitor. The newest version allows people with diabetes to use either a mobile app or receiver to check their blood sugar levels in real-time.',
            'body' => '',
            'url' => 'https://www.dexcom.com/get-started-cgm',
            'category_id' => 4,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_dexcom_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 24,

        ]
        );

        $tags = ['Mobile app', 'cgm'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);       
        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Evan', 'last_name' => 'Yates'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Some continuous glucose monitors, like the G5, will allow you to use your phone to check blood sugar levels instead of another device', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Omnipod',
            'slug' => str_slug($title, '-'),
            'description' => 'The Omnipod is a tubeless, wireless insulin pump for people with diabetes. It contains up to 72 hours of insulin and uses a remote PDM device.',
            'body' => '',
            'url' => 'https://www.myomnipod.com/',
            'category_id' => 4,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_omnipod_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 25,

        ]
        );

        $tags = ['Wireless', 'pdm', 'remote bolus'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);               

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Carol', 'last_name' => 'Lee'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Insulin pumps will not fix all of your insulin-administration issues, but it will help by providing a constant amount of insulin throughout the day while also allowing you to dose extra insulin around meals.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Contour Next Link',
            'slug' => str_slug($title, '-'),
            'description' => 'The Contour Next Link 2.4 is a CGM that pairs with the MiniMed 670G and MiniMed 630G insulin pumps, for remote, easy and accurate bolus insulin dosing and CGM calibration.',
            'body' => '',
            'url' => 'https://www.contournext.com/products/contour-next-link-meter',
            'category_id' => 4,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_contournext_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 26,

        ]
        );

        $tags = ['Insulin pump'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate); 

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Continuous glucose monitors will check your glucose levels throughout the day.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Animas Corp. - Animas Vibe',
            'slug' => str_slug($title, '-'),
            'description' => 'The Animas Vibe is the first continuous glucose monitoring (CGM)-enabled insulin pump with Dexcom Platinum CGM technology. The Animas Vibe is available to patients with type 1 diabetes as young as 2 years old.',
            'body' => '',
            'url' => 'https://www.animas.com/diabetes-insulin-pump-and-blood-glucose-meter/animas-vibe-insulin-pump',
            'icon_img' => 'uploads/images/icons/Icon_animas_330x200.png',
            'category_id' => 4,
            'expert_id' => 1,
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 27,

        ]
        );

        $tags = ['Dexcom-enabed'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Yvonne', 'last_name' => 'Summers'], ['credentials' => 'MD, PhD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Continuous glucose monitors work with certain insulin pumps and accessories. Be sure you’re getting the right pair.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Medtronic - Enlite Sensor',
            'slug' => str_slug($title, '-'),
            'description' => 'Medtronic’s Enlite Sensor provides the chance to continuously monitor glucose levels via Medtronic insulin pumps. Medtronic offers predictive alerts and allows the user to vary settings by time of day.',
            'body' => '',
            'url' => 'https://www.medtronicdiabetes.com/products/enlite-sensor',
            'category_id' => 4,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_medtronic_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 28,

        ]
        );

        $tags = ['Predictive alerts'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);        

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Phillipa', 'last_name' => 'Daelman'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Continuous glucose monitors can have alert systems. The Medtronic Enlite Sensor is one of these, sending notifications to the user when something is off.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Medtronic MiniMed Revel',
            'slug' => str_slug($title, '-'),
            'description' => 'Medtronic’s MiniMed Revel is part of the company’s Paradigm series of insulin pumps. It has a built-in continuous glucose monitor and anticipates high/low blood sugar.',
            'body' => '',
            'url' => 'https://www.medtronicdiabetes.com/products/minimed-revel-insulin-pump',
            'category_id' => 5,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_medtronic_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 29,

        ]
        );

        $tags = ['Built-in cgm'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);            

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Gregory', 'last_name' => 'Scott'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Insulin pumps like the MiniMed Reveal are often ready to pair with certain continuous glucose monitors.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Tandem Diabetes Care - t:slim X2™ Insulin Pump',
            'slug' => str_slug($title, '-'),
            'description' => 'The simple-to-use t:slim X2 Insulin Pump is the smallest pump available, the only pump capable of remote feature updates, and the only available pump that is compatible with Dexcom G5 Mobile continuous glucose monitoring (CGM).',
            'body' => '',
            'url' => 'https://www.tandemdiabetes.com/products/t-slim-x2-insulin-pump',
            'category_id' => 5,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_tandem_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 30,

        ]
        );

        $tags = ['Small', 'dexcom-compatible'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);        

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Billy', 'last_name' => 'Nagel'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Insulin pumps deliver insulin throughout the day. Features vary between models, so check to make sure that they cover all your needs.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Roche Diabetes Care - Accu-Check Combo',
            'slug' => str_slug($title, '-'),
            'description' => 'The Accu-Chek Combo uses wireless Bluetooth technology to communicate with the included Accu-Chek glucose meter. Not only are glucose results transferred to the insulin pump, but you can also control your pump with the glucose meter.',
            'body' => '',
            'url' => 'https://www.accu-chek.com/insulin-pumps-integrated-systems/combo-system/support',
            'category_id' => 5,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_accuchek_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 31,

        ]
        );

        $tags = ['Bluetooth'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Evan', 'last_name' => 'Yates'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Insulin pumps and continuous glucose meters use different technologies to talk to each other. The Accu-Chek Combo chose to use Bluetooth.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Animas - OneTouch Ping Glucose Management System',
            'slug' => str_slug($title, '-'),
            'description' => 'OneTouch Ping Glucose Management System provides insulin delivery at any time, from up to 10 feet away.',
            'body' => '',
            'url' => 'https://www.onetouch.com/products/insulin-pumps/onetouch-ping-glucose-management-system',
            'category_id' => 5,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_animas_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 32,

        ]
        );

        $tags = ['wireless'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);
        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Carol', 'last_name' => 'Lee'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Insulin pumps – like the OneTouch – often have wireless remotes that will let you administer insulin from a distance.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Companion Medical - InPen',
            'slug' => str_slug($title, '-'),
            'description' => 'The InPen insulin injector pen is an easy-to-use pen that not only helps calculate your doses but also keeps track of injection data. When paired via Bluetooth with the smartphone app, the InPen delivery system keep tabs on how many units you received at your last injection, when you took them, and other helpful information.',
            'body' => '',
            'url' => 'https://www.companionmedical.com/InPen/',
            'category_id' => 5,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_companionmedical_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 33,

        ]
        );

        $tags = ['Bluetooth', 'smartphone app'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);        

        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Not everyone can or wants to use an insulin pump, so insulin injector pens are often helpful.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'SOOIL Developments - DANA Diabecare R Remote System',
            'slug' => str_slug($title, '-'),
            'description' => 'DANA Diabecare R Remote System is a smart insulin pump with discrete remote control. The DANA R incorporates a BG meter in the remote control. This automatically shares BG test results with the DANA insulin pump using secure BT communication. There is no need to carry an extra glucose meter.',
            'body' => '',
            'url' => 'http://www.sooil.com/eng/product/',
            'category_id' => 5,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_sooil_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 43,

        ]
        );

        $tags = ['Remote control'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);           

        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Yvonne', 'last_name' => 'Summers'], ['credentials' => 'MD, PhD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Insulin pumps, glucose meters, and remote controls often talk to each other in different ways. The DANA R, for example, sends readings in the remote so you don’t have to have an extra device.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Omnipod',
            'slug' => str_slug($title, '-').'-2',
            'description' => 'The Omnipod is a tubeless, wireless insulin pump for people with diabetes. It contains up to 72 hours of insulin and uses a remote PDM device.',
            'body' => '',
            'url' => 'https://www.myomnipod.com/',
            'category_id' => 5,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_omnipod_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 25,

        ]
        );

        $tags = ['Wireless', 'pdm', 'remote bolus'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);               

        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Phillipa', 'last_name' => 'Daelman'], ['credentials' => 'MD, FACS', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Insulin pumps will not fix all of your insulin-administration issues, but it will help by providing a constant amount of insulin throughout the day while also allowing you to dose extra insulin around meals.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Myabetic - Clemens Diabetes Compact Wallet',
            'slug' => str_slug($title, '-'),
            'description' => 'Combine your everyday wallet needs with your diabetes testing supplies into one compact, stylish case.',
            'body' => '',
            'url' => 'https://www.myabetic.com/collections/all/products/clemens-diabetes-compact-wallet',
            'category_id' => 6,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_myabetic_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 35,

        ]
        );

        $tags = ['wallet'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  
        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Gregory', 'last_name' => 'Scott'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Living with diabetes is often difficult because of all the supplies you have to carry. Having a portable storage solution is key.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Frio - Mini Wallet Cooling Pack',
            'slug' => str_slug($title, '-'),
            'description' => 'Frio Mini Wallet Cooling Pack keeps insulin cool and safe while its insulating qualities help protect Insulin from heat.',
            'body' => '',
            'url' => 'http://www.frioinsulincoolingcase.com/frio-mini-wallet.html',
            'category_id' => 6,
            'expert_id' => 1,
            'icon_img' => '',            
            'icon_img' => 'uploads/images/icons/Icon_frio_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 35,

        ]
        );

        $tags = ['water-activated'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  
        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Billy', 'last_name' => 'Nagel'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Insulin needs to be kept at low temperatures, which is often difficult when you’re out of the house. Consider getting something to keep it cool if you’re out of the house.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Insta-Glucose',
            'slug' => str_slug($title, '-'),
            'description' => 'Insta-Glucose is a fast-acting, glucose gel for the emergency treatment of low blood sugar. The full 24 gram dose of carbohydrate is measured to treat mild to moderate hypoglycemia, and is administered by twisting off the cap and swallowing the cherry-flavored liquid. Absorption starts instantly, bringing relief in a just a few minutes.',
            'body' => '',
            'url' => 'https://instaglucose.com/about-insta-glucose/',
            'category_id' => 6,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_myabetic_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 37,

        ]
        );

        $tags = ['gel', 'carbohydrates'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  
        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Evan', 'last_name' => 'Yates'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Hypoglycemia can sometimes come on suddenly and having a readily available, fast-acting source of glucose can be important.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Ambimed Inject-Ease - Self Injection Aid',
            'slug' => str_slug($title, '-'),
            'description' => 'Conquer the anxiety of injections with the Inject-Ease, the device that makes injections easy. Simply place your loaded syringe in the Inject Ease, place the tip against your skin, and press the button to automatically deliver the needle through the skin. You control the rate at which the medicine is injected. The special tip is designed to reduce the sensation of pain at injection. Making injections easier helps reduce anxiety.',
            'body' => '',
            'url' => 'http://www.ambimedinc.com/inject-ease/',
            'category_id' => 6,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_ambimed_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 38,

        ]
        );

        $tags = ['syringe'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  
        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Carol', 'last_name' => 'Lee'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Injecting insulin is often necessary and if you’re not comfortable with needles you may have to find something to make the process easier, like the Inject-Ease.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Vial Safe',
            'slug' => str_slug($title, '-'),
            'description' => 'Vial Safe is a soft, reusable sleeve for 10 mL insulin vials that helps protect against impact. The sleeves can stay attached when the vial is being used and protects up to a 30 ft drop.',
            'body' => '',
            'url' => 'http://www.vialsafe.com',
            'category_id' => 6,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_vialsafe_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 39,

        ]
        );

        $tags = ['sleeve', 'protection'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  

        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'If you’ve got shaky hands or just tend to knock stuff off of counters, consider getting a protective sleeve for your insulin vials.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Abbott Freestyle Lancing Lite',
            'slug' => str_slug($title, '-'),
            'description' => 'A lightweight, portable blood glucose monitor that uses small blood samples',
            'body' => '',
            'url' => 'https://www.myfreestyle.com/freestyle-lite-overview',
            'category_id' => 6,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_abbott_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 40,

        ]
        );

        $tags = ['glucose monitor', 'portable'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  


        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Yvonne', 'last_name' => ' Summers'], ['credentials' => 'MD, PhD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Testing blood glucose is a hassle, so be sure to find a lancing device that isn’t too painful and is effective.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Accu-Chek Aviva Plus Test Strips',
            'slug' => str_slug($title, '-'),
            'description' => 'Test strips for Accu-Chek blood glucose monitors.',
            'body' => '',
            'url' => 'https://www.accu-chek.com/test-strips/aviva-plus-test-strips',
            'icon_img' => 'uploads/images/icons/Icon_accuchek_330x200.png',
            'category_id' => 6,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_accuchek_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 41,

        ]
        );

        $tags = ['test strips'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  

        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Phillipa', 'last_name' => 'Daelman'], ['credentials' => 'MD, FACS', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Each blood glucose monitor uses its own testing strips. Be sure to get the ones approved for your device.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Bayer Contour NEXT Test Strips',
            'slug' => str_slug($title, '-'),
            'description' => 'Bayer Contour NEXT meters.',
            'body' => '',
            'url' => 'https://www.contournext.com/products/contour-next-test-strips/',
            'category_id' => 6,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_bayer_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 42,

        ]
        );

        $tags = ['test strips'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  

        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Gregory', 'last_name' => 'Scott'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Test strips aren’t interchangeable, so make sure yours fit your device.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Accu-Chek Softclix Lancing Device',
            'slug' => str_slug($title, '-'),
            'description' => 'Accu-Chek’s Softclix is a lancing device with 11 depth settings and uses 28-gauge lancets.',
            'body' => '',
            'url' => 'https://www.accu-chek.com/lancing/softclix-lancing-device',
            'category_id' => 6,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_accuchek_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 34,

        ]
        );

        $tags = ['lancing device'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  

        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Billy', 'last_name' => 'Nagel'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Some lancing devices have more features than others. The Softclix has quite a few that could be useful, or just an extra step to deal with.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Diabetes Research Institute Foundation',
            'slug' => str_slug($title, '-'),
            'description' => 'The Diabetes Research Institute’s mission is to develop and rapidly apply the most promising research to treat and cure those now living with diabetes.',
            'body' => '<p><b>Mission Statement:</b> The Diabetes Research Institute’s mission is to develop and rapidly apply the most promising research to treat and cure those now living with diabetes.</p>',
            'url' => 'https://www.diabetesresearch.org',
            'category_id' => 7,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_diabetesresearchinstitute_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 44,

        ]
        );

        $tags = ['diabetes research', 'medical research', 'public policy analysis', 'stem cell research', 'islet transplantation', 'clinical trials'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  

        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Evan', 'last_name' => 'Yates'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'The DRI does a lot of work funding research. They are a good source to see what is developing in diabetes treatment.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'American Diabetes Association',
            'slug' => str_slug($title, '-'),
            'description' => 'The ADA is one of the largest diabetes-centric organizations, counting over a million members. The organization is involved in a wide variety of diabetes prevention and awareness activities ranging from supporting research to providing information to diabetics and their families.',
            'body' => '<p><b>Mission Statement:</b> To prevent and cure diabetes and to improve the lives of all people affected by diabetes.</p>',
            'url' => 'http://www.diabetes.org',
            'category_id' => 7,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_americandiabetesassociation_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 45,

        ]
        );


        $tags = ['diabetes research', 'advocacy', 'informational resource', 'community', 'nutrition', 'fitness'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  

        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Carol', 'last_name' => 'Lee'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'The ADA is the primary organization for diabetes awareness and information. Their website has a number of different resources and they are involved in a lot of different efforts to support people with diabetes.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'JDRF',
            'slug' => str_slug($title, '-'),
            'description' => 'JDRF is one of the leading funders of research to prevent and treat type 1 diabetes. Their initiatives include developing an artificial pancreas, beta cell replacement, glucose control, and funding early-career scientists.',
            'body' => '<p><b>Mission Statement:</b> Accelerating life-changing breakthroughs to cure, prevention, and treatment of T1D and its complications.</p>',
            'url' => 'http://www.jdrf.org',
            'category_id' => 7,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_jdrf_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 46,

        ]
        );

        $tags = ['diabetes research', 'funding', 'type 1 diabetes'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  

        
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Lea', 'last_name' => 'MacGrory'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'JDRF funds a lot of projects related to type 1 diabetes treatment. Check their website to see some of the big initiatives they have going on.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'College Diabetes Network',
            'slug' => str_slug($title, '-'),
            'description' => 'College Diabetes Network’s website contains resources for people with diabetes about to start college and current college students who are have diabetes. The organization seeks to create a cross-campus community of students who can provide support and information to each other.',
            'body' => '<p><b>Mission Statement:</b> CDN&#39;s mission is to provide innovative peer based programs which connect and empower students and young professionals to thrive with diabetes.</p>',
            'url' => 'https://collegediabetesnetwork.org',
            'category_id' => 7,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_collegediabetesnetwork_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 45,

        ]
        );

        $tags = ['diabetes information', 'resource', 'college', 'support'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  

       
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Yvonne', 'last_name' => 'Summers'], ['credentials' => 'MD, PhD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Going off to college can be life-changing and stressful. CDN provides resources to make the transition easier.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Children’s Diabetes Foundation',
            'slug' => str_slug($title, '-'),
            'description' => 'The Children’s Diabetes Foundation raises money to fund the initiatives and management of the Barbara Davis Center. The Center runs over 80 studies and provides clinical care to diabetic patients',
            'body' => '<p><b>Mission Statement:</b> The Children’s Diabetes Foundation’s mission is to raise funds to support the Barbara Davis Center for Diabetes, where thousands of patients of all ages from all over the world receive the finest diabetes care available. Since 1978, the Children’s Diabetes Foundation has contributed $100 million dollars to the Barbara Davis Center.</p>',
            'url' => 'http://www.childrensdiabetesfoundation.org',
            'category_id' => 7,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_childrensdiabetesfoundation_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 49,

        ]
        );


        $tags = ['diabetes', 'research', 'fundraising'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }

        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  


       
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Gregory', 'last_name' => 'Scott'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'The Children’s Diabetes Foundation is tied to a specific treatment center, but it still does a lot of good work.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Diabetes Sisters',
            'slug' => str_slug($title, '-'),
            'description' => 'Diabetes Sisters provides information, educational resources, and community-building opportunities for women to help manage their diabetes.',
            'body' => '<p><b>Mission Statement:</b> Diabetes Sisters’ mission is to improve the health and quality of life of women with diabetes, and to advocate on their behalf.</p>',
            'url' => 'https://diabetessisters.org',
            'category_id' => 7,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_diabetessisters_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 49,

        ]
        );


        $tags = ['women', 'diabetes', 'education', 'community'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  

       
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Billy', 'last_name' => 'Nagel'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Diabetes Sisters is an organization that specifically helps women with diabetes.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Beyond Type 1',
            'slug' => str_slug($title, '-'),
            'description' => 'Started by singer-songwriter Nick Jonas, Beyond Type 1 provides educational resources and community engagement opportunities for people with diabetes to learn about their condition.',
            'body' => '<p><b>Mission Statement:</b> Beyond Type 1 is a new brand of philanthropy leveraging the power of social media and technology, changing what it means to live with Type 1 diabetes.</p>',
            'url' => 'https://beyondtype1.org',
            'category_id' => 7,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_beyondtype1_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 50,

        ]
        );


        $tags = ['research', 'community', 'diabetes'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  

       
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Evan', 'last_name' => 'Yates'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'A relatively new organization, Beyond Type 1 does outreach to help people learn about their diabetes.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
        $id = DB::table('resources')->insertGetId(
        [
            'title' => $title = 'Glu',
            'slug' => str_slug($title, '-'),
            'description' => 'Glu is an online community built to encourage participation in T1D Exchange initiatives. Users join a community on the Glu site and submit research surveys and other information to researchers.',
            'body' => '<p><b>Mission Statement:</b> Glu is an online community of T1D Exchange, a unique nonprofit organization focused on driving faster, better research to improve outcomes in type 1 diabetes.</p>',
            'url' => 'https://myglu.org',
            'category_id' => 7,
            'expert_id' => 1,
            'icon_img' => 'uploads/images/icons/Icon_glu_330x200.png',            
            'sponsored' => (bool)random_int(0, 1),
            'related_resource_id' => 15,

        ]
        );


        $tags = ['community', 'diabetes', 'research'];
        $tagsToCreate = [];

        foreach($tags as $tagK => $tagV){
            if($tag = Tag::firstOrCreate(['slug' => str_slug($tagV)], ['title' => $tagV])) {
                $tagsToCreate[] = $tag->id;
            }
        }
        $resource = Resource::find($id);
        $resource->tags()->sync($tagsToCreate);  
       
        //Expert and quote
        $expert = Expert::firstOrCreate(['first_name' => 'Carol', 'last_name' => 'Lee'], ['credentials' => 'MD', 'city' => '', 'state' => '']);
        $resource->expert()->associate($expert);
        
        $quote = Quote::create(['message' => 'Glu is an interesting experiment in crowdsourcing diabetes information. The goal is to create a community of people with diabetes who can help get information to researchers faster.', 'resource_id' => $resource->id, 'expert_id' => $expert->id]);
        $resource->save();



        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // RELATED RESOURCE 
        //==================

        $allResource = Resource::all();

        foreach($allResource as $k => $v){
            echo $v->id.' '.$v->title."\r\n";
        }

    }
}
