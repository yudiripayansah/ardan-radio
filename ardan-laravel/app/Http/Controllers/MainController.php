<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainController extends Controller
{
  public function __construct() {
    $this->menu = json_decode(\File::get('resources/menu.json'));
  }
  public function index(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.dashboard',$data);
  }
  public function member(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.member',$data);
  }
  public function program(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.program',$data);
  }
  public function penyiar(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.penyiar',$data);
  }
  public function feed(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.feed',$data);
  }
  public function content(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.content',$data);
  }
  public function music(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.music',$data);
  }
  public function liveStreaming(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.liveStreaming',$data);
  }
  public function liveChat(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.liveChat',$data);
  }
  public function notification(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.notification',$data);
  }
  public function banner(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.banner',$data);
  }
  public function category(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.category',$data);
  }
  public function news(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.news',$data);
  }
  public function event(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.event',$data);
  }
  public function user(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.user',$data);
  }
  public function login(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.login',$data);
  }
  public function msharing($id) {
    $data['type'] = 'sharing';
    $data['id'] = $id;
    return view('pages.sharing',$data);
  }
  public function mpost($id) {
    $data['type'] = 'post';
    $data['id'] = $id;
    return view('pages.sharing',$data);
  }
  public function mnews($id) {
    $data['type'] = 'news';
    $data['id'] = $id;
    return view('pages.sharing',$data);
  }
  public function mevents($id) {
    $data['type'] = 'events';
    $data['id'] = $id;
    return view('pages.sharing',$data);
  }
  public function mprogram($id) {
    $data['type'] = 'program';
    $data['id'] = $id;
    return view('pages.sharing',$data);
  }
  public function mnotif($id) {
    $data['type'] = 'notif';
    $data['id'] = $id;
    return view('pages.sharing',$data);
  }
}
