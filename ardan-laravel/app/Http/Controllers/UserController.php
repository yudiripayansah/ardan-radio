<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Penyiar;
use App\Models\UserToken;
use App\Models\Feeds;
use App\Models\Likes;
use App\Models\PageViews;

class UserController extends Controller
{
  public function __construct() {
    $this->middleware('auth:api', ['except' => ['read', 'get','create','update','createToken','readToken','userFollow','dashboard','saveStats']]);
  }
  public function read(Request $request) {
    $page = ($request->page) ? $request->page : 1;
    $perPage = ($request->perPage) ? $request->perPage : '~';
    $offset = ($page > 1) ? ($page - 1) * $perPage : 0;
    $sortDir = ($request->sortDir) ? $request->sortDir : 'DESC';
    $sortBy = ($request->sortBy) ? $request->sortBy : 'updated_at';
    $search = ($request->search) ? $request->search : null;
    $total = 0;
    $totalPage = 1;
    $id_user = ($request->id_user) ? $request->id_user : null;
    $role = ($request->role) ? $request->role : null;
    $listData = User::select('users.*')->orderBy($sortBy, $sortDir);
    if ($perPage != '~') {
        $listData->skip($offset)->take($perPage);
    }
    if ($role != null) {
        $listData->where('users.role',$role);
    }
    if ($search != null) {
        $listData->whereRaw('(users.name LIKE "%'.$search.'%")');
    }
    $listData = $listData->get();
    foreach($listData as $ld) {
      $ld->image_url = Storage::disk('public')->url('user/'.$ld->image);
    }
    if ($search || $id_user || $role) {
        $total = User::orderBy($sortBy, $sortDir);
        if ($search) {
            $total->whereRaw('(users.name LIKE "%'.$search.'%")');
        }
        if ($role) {
            $total->where('users.role',$role);
        }
        $total = $total->count();
    } else {
        $total = User::all()->count();
    }
    if ($perPage != '~') {
        $totalPage = ceil($total / $perPage);
    }
    $res = array(
        'status' => true,
        'data' => $listData,
        'msg' => 'List data available',
        'total' => $total,
        'totalPage' => $totalPage,
        'paging' => array(
          'page' => $page,
          'perPage' => $perPage,
          'sortDir' => $sortDir,
          'sortBy' => $sortBy,
          'search' => $search
        )
    );
    return response()->json($res, 200);
  }
  public function get(Request $request) {
    if ($request->id) {
      $getData = User::find($request->id);
      $getData->image_url = ($getData->image) ? Storage::disk('public')->url('user/'.$getData->image) : null;
      $getData->followers_count = Likes::where('id_target',$getData->id)->where('type','FOLLOW')->count();
      $getData->following_count = Likes::where('id_user',$getData->id)->where('type','FOLLOW')->count();
      $getData->post_count = Feeds::where('id_user',$getData->id)->where('type','POST')->count();
      if ($getData) {
          $res = array(
                  'status' => true,
                  'data' => $getData,
                  'msg' => 'Data available'
                );
      } else {
          $res = array(
                  'status' => false,
                  'msg' => 'Data not found'
                );
      }
    } else {
      $res = array(
        'status' => false,
        'msg' => 'No data selected'
      );
    }
    return response()->json($res, 200);
  }
  public function create(Request $request) {
    $dataCreate = $request->all();
    if($request->image){
      $filename = uniqid().time().'-'. '-users.png';
      $filePath = 'user/' .$filename;
      $dataCreate['image'] = $filename;
      Storage::disk('public')->put($filePath, file_get_contents($request->image));
    } else {
      unset($dataCreate['image']);
    }
    $dataCreate['password'] = Hash::make($request->password);
    DB::beginTransaction();
    $validate = User::validate($dataCreate);
    $checkUser = $this->checkUser($request);
    if($checkUser) {
      if ($validate['status']) {
        try {
          $dc = User::create($dataCreate);
          $dg = User::find($dc->id);
          if(isset($dataCreate['penyiar']) && $dataCreate['penyiar'] == 'Yes'){
            $cp = $this->processPenyiar($dg);
          }
          $res = array(
                  'status' => true,
                  'data' => $dg,
                  'msg' => 'Data successfully created'
                );
          DB::commit();
        } catch (Exception $e) {
          DB::rollback();
          $res = array(
                  'status' => false,
                  'data' => $dataCreate,
                  'msg' => 'Failed to create data'
                );
        }
      } else {
        $res = array(
                'status' => false,
                'data' => $dataCreate,
                'msg' => 'Validation failed',
                'errors' => $validate['error']
              );
      }
    } else {
      $res = array(
        'status' => false,
        'msg' => 'Email Already Exists'
      );
    }
    return response()->json($res, 200);
  }
  public function update(Request $request) {
    $dataUpdate = $request->all();
    $dataFind = User::find($request->id);
    $validate = User::validate($dataUpdate);
    if (basename($request->image) != basename($dataFind->image)) {
      $filename = uniqid().time().'-'. '-users.png';
      $filePath = 'user/' .$filename;
      $dataUpdate['image'] = $filename;
      Storage::disk('public')->put($filePath, file_get_contents($request->image));
    } else {
      unset($dataUpdate['image']);
    }
    unset($dataUpdate['created_at']);
    unset($dataUpdate['updated_at']);
    unset($dataUpdate['deleted_at']);
    unset($dataUpdate['image_url']);
    unset($dataUpdate['followers_count']);
    unset($dataUpdate['following_count']);
    unset($dataUpdate['post_count']);
    if($request->password && $request->password != null && $request->password != 'null'){
      $dataUpdate['password'] = Hash::make($request->password);
    } else {
      unset($dataUpdate['password']);
    }
    // DB::beginTransaction();
    if ($validate['status']) {
      try {
        $du = User::where('id',$request->id)->update($dataUpdate);
        $dg = User::find($request->id);
        if(isset($dataUpdate['penyiar']) && $dataUpdate['penyiar'] == 'Yes'){
          $dg->image_url = ($dg->image) ? Storage::disk('public')->url('user/'.$dg->image) : null;
          $cp = $this->processPenyiar($dg);
        }
        $dg->image_url = ($dg->image) ? Storage::disk('public')->url('user/'.$dg->image) : null;
        $dg->followers_count = Likes::where('id_target',$dg->id)->where('type','FOLLOW')->count();
        $dg->following_count = Likes::where('id_user',$dg->id)->where('type','FOLLOW')->count();
        $dg->post_count = Feeds::where('id_user',$dg->id)->where('type','POST')->count();
        $res = array(
                'status' => true,
                'data' => $dg,
                'data_update' => $dataUpdate,
                'msg' => 'Data Successfully Saved'
              );
        // DB::commit();
      } catch (Exception $e) {
        $res = array(
                'status' => false,
                'msg' => 'Failed to Save Data'
              );
        // DB::rollback();
      }
    } else {
      $res = array(
        'status' => false,
        'data' => $request->all(),
        'msg' => 'Validation failed',
        'errors' => $validate['error']
      );
    }
    return response()->json($res, 200);
  }
  public function delete(Request $request) {
    $id = $request->id;
    if ($id) {
      $delData = User::find($id);
      try {
        $delData->delete();
        $res = array(
            'status' => true,
            'msg' => 'Data successfully deleted'
        );
      } catch (Exception $e) {
        $res = array(
                'status' => false,
                'msg' => 'Failed to delete Data'
              );
      }
    } else {
      $res = array(
              'status' => false,
              'msg' => 'No data selected'
            );
    }
    return response()->json($res, 200);
  }
  public function checkUser($request) {
    $user = User::where('email',$request->email)->get();
    if(count($user) > 0) {
      $res = false;
    } else {
      $res = true;
    }
    return $res;
  }
  public function createToken(Request $request) {
    $token = UserToken::where('token',$request->token)->first();
    $dataCreate = $request->all();
    $validate = UserToken::validate($dataCreate);
    if ($validate['status']) {
      try {
        if($token && $token->id){
          $dc = $token;
          $dc->id_user = $request->id_user;
          $dc->name = $request->name;
          $dc->save();
        } else {
          $dc = UserToken::create($dataCreate);
        }
        $dg = UserToken::find($dc->id);
        $res = array(
                'status' => true,
                'data' => $dg,
                'msg' => 'Data successfully created'
              );
      } catch (Exception $e) {
        $res = array(
                'status' => false,
                'data' => $dataCreate,
                'msg' => 'Failed to create data'
              );
      }
    } else {
      $res = array(
              'status' => false,
              'data' => $dataCreate,
              'msg' => 'Validation failed',
              'errors' => $validate['error']
            );
    }
    return response()->json($res, 200);
  }
  public function readToken(Request $request) {
    $page = ($request->page) ? $request->page : 1;
    $perPage = ($request->perPage) ? $request->perPage : '~';
    $offset = ($page > 1) ? ($page - 1) * $perPage : 0;
    $sortDir = ($request->sortDir) ? $request->sortDir : 'DESC';
    $sortBy = ($request->sortBy) ? $request->sortBy : 'updated_at';
    $search = ($request->search) ? $request->search : null;
    $total = 0;
    $totalPage = 1;
    $listData = UserToken::select('user_token.*')->orderBy($sortBy, $sortDir);
    if ($perPage != '~') {
        $listData->skip($offset)->take($perPage);
    }
    if ($search != null) {
        $listData->whereRaw('(user_token.name LIKE "%'.$search.'%")');
    }
    $listData = $listData->get();
    if ($search) {
        $total = UserToken::orderBy($sortBy, $sortDir);
        if ($search) {
            $total->whereRaw('(user_token.name LIKE "%'.$search.'%")');
        }
        $total = $total->count();
    } else {
        $total = UserToken::all()->count();
    }
    if ($perPage != '~') {
        $totalPage = ceil($total / $perPage);
    }
    $res = array(
        'status' => true,
        'data' => $listData,
        'msg' => 'List data available',
        'total' => $total,
        'totalPage' => $totalPage,
        'paging' => array(
          'page' => $page,
          'perPage' => $perPage,
          'sortDir' => $sortDir,
          'sortBy' => $sortBy,
          'search' => $search
        )
    );
    return response()->json($res, 200);
  }
  public function processPenyiar($req) {
    $dc = false;
    $dataCreate = [
      'name' => $req['name'],
      'id_user' => $req['id'],
    ];
    $dataFind = Penyiar::where('id_user', $req['id'])->count();
    if($dataFind < 1){
      if($req['image']) {
        $filename = uniqid().time().'-'. '-penyiar.png';
        $filePath = 'penyiar/' .$filename;
        $image = $filename;
        if($req['image_url']){
          Storage::disk('public')->put($filePath, file_get_contents($req['image_url']));
        } else {
          Storage::disk('public')->put($filePath, file_get_contents($req['image']));
        }
        $dataCreate['image'] = $image;
      }
      $dc = Penyiar::create($dataCreate);
    } 
    return $dc;
  }
  public function userFollow(Request $request){
    $page = ($request->page) ? $request->page : 1;
    $perPage = ($request->perPage) ? $request->perPage : '~';
    $offset = ($page > 1) ? ($page - 1) * $perPage : 0;
    $sortDir = ($request->sortDir) ? $request->sortDir : 'DESC';
    $sortBy = ($request->sortBy) ? $request->sortBy : 'updated_at';
    $search = ($request->search) ? $request->search : null;
    $total = 0;
    $totalPage = 1;
    $id_user = ($request->id_user) ? $request->id_user : null;
    $id_target = ($request->id_target) ? $request->id_target : null;
    $listData = Likes::select('likes.*')->where('type','FOLLOW')->orderBy('id', 'DESC')->with('user')->with('user_target');
    if ($perPage != '~') {
      $listData->skip($offset)->take($perPage);
    }
    if ($search != null) {
        $listData->whereRaw('(likes.name LIKE "%'.$search.'%")');
    }
    if ($id_user != null) {
        $listData->where('likes.id_user',$id_user);
    }
    if ($id_target != null) {
        $listData->where('likes.id_target',$id_target);
    }
    $listData = $listData->get();
    foreach($listData as $ld) {
      if($ld->user){
        $ld->user->image_url = Storage::disk('public')->url('user/'.$ld->user->image);
      }
      if($ld->user_target){
        $ld->user_target->image_url = Storage::disk('public')->url('user/'.$ld->user_target->image);
      }
    }
    if ($search || $id_user || $id_target) {
        $total = Likes::orderBy($sortBy, $sortDir);
        if ($search) {
            $total->whereRaw('(likes.name LIKE "%'.$search.'%")');
        }
        if ($id_user) {
            $total->where('likes.id_user',$id_user);
        }
        if ($id_target) {
            $total->where('likes.id_target',$id_target);
        }
        $total = $total->count();
    } else {
        $total = Likes::all()->count();
    }
    if ($perPage != '~') {
        $totalPage = ceil($total / $perPage);
    }
    $res = array(
        'status' => true,
        'data' => $listData,
        'msg' => 'List data available',
        'total' => $total,
        'totalPage' => $totalPage,
        'paging' => array(
          'page' => $page,
          'perPage' => $perPage,
          'sortDir' => $sortDir,
          'sortBy' => $sortBy,
          'search' => $search
        )
    );
    return response()->json($res, 200);
  }
  public function dashboard() {
    $all = User::where('role','member')->get()->count();
    $male = User::where('role','member')->where('gender','Laki-Laki')->get()->count();
    $female = User::where('role','member')->where('gender','Perempuan')->get()->count();
    $radio_stream = PageViews::where('type','radio_stream')->get()->count();
    $home = PageViews::where('type','home')->get()->count();
    $social = PageViews::where('type','social')->get()->count();
    $news = PageViews::where('type','news')->get()->count();
    $content = PageViews::where('type','content')->get()->count();
    $events = PageViews::where('type','events')->get()->count();
    $res = [
        'data'=> [
          'all' => $all,
          'male' => $male,
          'female' => $female,
          'radio_stream' => $radio_stream,
          'home' => $home,
          'social' => $social,
          'news' => $news,
          'content' => $content,
          'events' => $events,
        ],
        'status' => true
      ];
    return response()->json($res, 200);
  }
  public function saveStats(Request $request) {
    $dataRequest = $request->all();
    $dataFind = PageViews::where('type',$dataRequest->type)->first();
    $validate = PageViews::validate($dataRequest);
    if ($validate['status']) {
      try {
        if($dataFind){
          $dataRequest['views'] = $dataFind->views + 1;
          $dt = PageViews::where('id',$dataFind->id)->update($dataRequest);
        } else {
          $dataRequest['views'] = 1;
          $dt = PageViews::create($dataRequest);
        }
        $res = array(
                'status' => true,
                'data_request' => $dataRequest,
                'msg' => 'Data Successfully Saved'
              );
      } catch (Exception $e) {
        $res = array(
                'status' => false,
                'msg' => 'Failed to Save Data'
              );
      }
    } else {
      $res = array(
        'status' => false,
        'data' => $request->all(),
        'msg' => 'Validation failed',
        'errors' => $validate['error']
      );
    }
    return response()->json($res, 200);
  }
}
