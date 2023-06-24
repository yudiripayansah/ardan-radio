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
  public function radio(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.radio',$data);
  }
  public function feed(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.feed',$data);
  }
  public function music(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.music',$data);
  }
  public function liveStreaming(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.liveStreaming',$data);
  }
  public function notification(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.notification',$data);
  }
  public function banner(Request $request) {
    $data['menu'] = $this->menu;
    return view('pages.banner',$data);
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
}
