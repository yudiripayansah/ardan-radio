<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class RadiosSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    // https://stream.rcs.revma.com/1q762wy5a9hvv
    // https://stream.rcs.revma.com/1q762wy5a9hvv/hls.m3u8
    // https://n09.rcs.revma.com/1q762wy5a9hvv.m4a?1675997040=&rj-tok=AAABhjk-eo4Aj03-Z03mDUOA_A&rj-ttl=5
    $radios = [
      [
        'image' => 'ardanradio.png',
        'title' => 'Ardan FM',
        'text' => 'Ardan FM',
        'url' => 'https://stream.rcs.revma.com/1q762wy5a9hvv',
        'status' => 'Active',
      ],
      [
        'image' => 'ardanradio.png',
        'title' => 'Ardan FM',
        'text' => 'Ardan FM',
        'url' => 'https://stream.rcs.revma.com/1q762wy5a9hvv/hls.m3u8',
        'status' => 'Active',
      ],
      [
        'image' => 'ardanradio.png',
        'title' => 'Ardan FM',
        'text' => 'Ardan FM',
        'url' => 'https://n09.rcs.revma.com/1q762wy5a9hvv.m4a?1675997040=&rj-tok=AAABhjk-eo4Aj03-Z03mDUOA_A&rj-ttl=5',
        'status' => 'Active',
      ],
    ];
    foreach($radios as $user){
      DB::table('radios')->insert($user);
    }
  }
}
