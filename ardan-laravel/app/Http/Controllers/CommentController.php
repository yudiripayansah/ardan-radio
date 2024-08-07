<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Comments;
use App\Models\UserToken;
use App\Models\Feeds;
use App\Models\User;
use Kutia\Larafirebase\Messages\FirebaseMessage;

class CommentController extends Controller
{
  public function __construct()
  {
    $this->middleware('auth:api', ['except' => ['read', 'get', 'create', 'update']]);
  }
  public function read(Request $request)
  {
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
    $target_type = ($request->target_type) ? $request->target_type : null;

    $listData = Comments::select('comments.*')->orderBy($sortBy, $sortDir)->with('user');
    if ($perPage != '~') {
      $listData->skip($offset)->take($perPage);
    }
    if ($search != null) {
      $listData->whereRaw('(comments.name LIKE "%' . $search . '%" OR comments.comment LIKE "%' . $search . '%")');
    }
    if ($id_user != null) {
      $listData->where('id_user',$id_user);
    }
    if ($id_target != null) {
      $listData->where('id_target',$id_target);
    }
    if ($target_type != null) {
      $listData->where('target_type',$target_type);
    }
    $listData = $listData->get();
    foreach($listData as $ld){
      $ld->created_on = date('d F Y H:i',strtotime($ld->created_at));
      $ld->user->image_url = ($ld->user->image) ? Storage::disk('public')->url('user/'.$ld->user->image) : null;
    }
    if ($search || $id_user || $target_type) {
      $total = Comments::orderBy($sortBy, $sortDir);
      if ($search) {
        $total->whereRaw('(comments.name LIKE "%' . $search . '%" OR comments.comment LIKE "%' . $search . '%")');
      }
      if ($id_user) {
        $total->where('id_user',$id_user);
      }
      if ($id_target) {
        $total->where('id_target',$id_target);
      }
      if ($target_type) {
        $total->where('target_type',$target_type);
      }
      $total = $total->count();
    } else {
      $total = Comments::all()->count();
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
  public function get(Request $request)
  {
    if ($request->id) {
      $getData = Comments::find($request->id);
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
  public function create(Request $request)
  {
    $dataCreate = $request->all();
    DB::beginTransaction();
    $validate = Comments::validate($dataCreate);
    if ($validate['status']) {
      try {
        $dc = Comments::create($dataCreate);
        $dg = Comments::find($dc->id);
        $user = User::find($dataCreate['id_user']);
        $feed = Feeds::find($dataCreate['id_target']);
        $notif = new \stdClass();
        $notif->title = 'New Comments';
        $userToken = UserToken::where('id_user', $feed->id_user)->get();
        $notif->message = $user->name.' comment on your SOCIAL '.$feed->type;
        if($userToken){
          $notif->tokens = $userToken;
          $notif->id_user_target = 'private';
          $notif->image = null;
          $notif->icon = null;
          $this->notif($notif);
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
    return response()->json($res, 200);
  }
  public function update(Request $request)
  {
    $dataUpdate = $request->all();
    $validate = Comments::validate($dataUpdate);
    unset($dataUpdate['created_at']);
    unset($dataUpdate['created_on']);
    unset($dataUpdate['updated_at']);
    unset($dataUpdate['deleted_at']);
    DB::beginTransaction();
    if ($validate['status']) {
      try {
        $du = Comments::where('id', $request->id)->update($dataUpdate);
        $dg = Comments::find($request->id);
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
  public function delete(Request $request)
  {
    $id = $request->id;
    if ($id) {
      $delData = Comments::find($id);
      try {
        $delData->forceDelete();
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
  
  function notif($data){
    $tokens = [];
    foreach($data->tokens as $t){
      array_push($tokens, $t->token);
    }
    if($data->id_user_target == 'all') {
      $getToken = UserToken::all();
      foreach($getToken as $t){
        array_push($tokens, $t->token);
      }
    }
    if(count($tokens) > 0){
      $fcm = (new FirebaseMessage);
      $fcm = $fcm->withTitle($data->title);
      $fcm = $fcm->withBody($data->message);
      if($data->image){
        $fcm = $fcm->withImage($data->image);
      }
      if($data->icon){
        $fcm = $fcm->withIcon($data->icon);
      }
      $fcm = $fcm->withSound('default');
      $fcm = $fcm->withPriority('high');
      $fcm = $fcm->withAdditionalData($data);
      $fcm = $fcm->asNotification($tokens);
    } else {
      $fcm = 'No token to send';
    }
    return $fcm;
  }
}
