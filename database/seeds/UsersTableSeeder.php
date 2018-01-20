<?php

use Illuminate\Database\Seeder;

use App\Expert;
use App\User;
use App\Administrator;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'username' => 'thealbertyang',
            'first_name' => 'Albert',
            'last_name' => 'Yang',
            'email' => 'thealbertyang@gmail.com',
            'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_evanyates_150x150.png',
            'password' => bcrypt('demotest123'),
            'remember_token' => str_random(10)
        ];

        $expertData = [
            'about' => 'This is an about description.',
            'highlights' => 'This is highlights.',
            'occupation' => 'Cardiologist',
            'credentials' => 'MD',
            'affiliations' => json_encode(['Web MD', 'Hospital']),
            'personal_url' => 'http://www.thealbertyang.com', 
            'address' => '6755 Warner Ave.', 
            'city' => 'Huntington Beach', 
            'state' => 'CA', 
            'zip' => '90032', 
        ];

        $user = User::create($data);

        $expert = Expert::create($expertData);

        $expert->user()->save($user);



        $data = [
            'username' => 'doctorpedia',
            'avatar_img' => 'uploads/images/avatars/img_placeholder_expert_evanyates_150x150.png',
            'first_name' => 'Team',
            'last_name' => 'Doctorpedia',
            'email' => 'team@doctorpedia.com',
            'password' => bcrypt('doctorpedia123'),
            'remember_token' => str_random(10)
        ];

        $adminData = [
        ];

        $user = User::create($data);

        $admin = Administrator::create($adminData);

        $admin->user()->save($user);
    }
}
