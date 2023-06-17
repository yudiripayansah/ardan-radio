<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $users = [
      [
        'username' => 'admin',
        'email' => 'admin@ardanradio.com',
        'name' => 'Administrator',
        'phone' => '08123456789',
        'address' => 'Bandung',
        'gender' => 'Laki-Laki',
        'password' => Hash::make('admin'),
        'role' => 'admin',
      ],
      [
        'username' => 'superadmin',
        'email' => 'superadmin@ardanradio.com',
        'name' => 'Superadmin',
        'phone' => '08123456789',
        'address' => 'Bandung',
        'gender' => 'Laki-Laki',
        'password' => Hash::make('superadmin'),
        'role' => 'superadmin',
      ],
      [
        'username' => 'member',
        'email' => 'member@ardanradio.com',
        'name' => 'Member',
        'phone' => '08123456789',
        'address' => 'Bandung',
        'gender' => 'Laki-Laki',
        'password' => Hash::make('member'),
        'role' => 'member',
      ]
    ];
    foreach($users as $user){
      DB::table('users')->insert($user);
    }
  }
}
