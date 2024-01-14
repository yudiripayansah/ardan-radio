<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\UserToken;
use App\Models\Feeds;
use App\Models\Likes;

class UserController extends Controller
{
  public function __construct() {
    $this->middleware('auth:api', ['except' => ['read', 'get','create','update','createToken','readToken']]);
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
    if($request->password || $request->password != null || $request->password != 'null'){
      $dataUpdate['password'] = Hash::make($request->password);
    } else {
      unset($dataUpdate['password']);
    }
    DB::beginTransaction();
    if ($validate['status']) {
      try {
        $du = User::where('id',$request->id)->update($dataUpdate);
        $dg = User::find($request->id);
        $res = array(
                'status' => true,
                'data' => $dg,
                'msg' => 'Data Successfully Saved'
              );
        DB::commit();
      } catch (Exception $e) {
        $res = array(
                'status' => false,
                'msg' => 'Failed to Save Data'
              );
        DB::rollback();
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
        if($token->id){
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
}
