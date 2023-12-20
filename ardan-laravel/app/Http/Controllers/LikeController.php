<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Likes;

class LikeController extends Controller
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

    $listData = Likes::select('likes.*')->orderBy($sortBy, $sortDir)->with('user');
    if ($perPage != '~') {
      $listData->skip($offset)->take($perPage);
    }
    if ($search != null) {
      $listData->whereRaw('(likes.type LIKE "%' . $search . '%")');
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
      $total = Likes::orderBy($sortBy, $sortDir);
      if ($search) {
        $total->whereRaw('(likes.type LIKE "%' . $search . '%")');
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
  public function get(Request $request)
  {
    if ($request->id_target && $request->type) {
      $getData = Likes::where('id_target',$request->id_target)->where('type',$request->type);
      $like_count = $getData->count();
      $first_three = $getData->limit(3)->orderBy('id','ASC')->with('user')->get();
      if ($like_count && $first_three) {
        $res = array(
          'status' => true,
          'data' => [
            'like_count' => $like_count,
            'first_three' => $first_three
          ],
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
    $checkLike = Likes::where('id_user',$request->id_user)->where('id_target',$request->id_target)->where('type',$request->type);
    $countCheckLike = $checkLike->count();
    if($countCheckLike < 1){
      $validate = Likes::validate($dataCreate);
      if ($validate['status']) {
        try {
          $dc = Likes::create($dataCreate);
          $dg = Likes::find($dc->id);
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
      $dataLike = $checkLike->first();
      $deleteLike = Likes::find($dataLike->id)->forceDelete();
      $res = [
        'data' => [$dataLike,$deleteLike],
        'status' => true,
        'msg' => 'Unlike Successfully'
      ];
      DB::commit();
    }
    return response()->json($res, 200);
  }
  public function update(Request $request)
  {
    $dataUpdate = $request->all();
    $validate = Likes::validate($dataUpdate);
    unset($dataUpdate['created_at']);
    unset($dataUpdate['created_on']);
    unset($dataUpdate['updated_at']);
    unset($dataUpdate['deleted_at']);
    DB::beginTransaction();
    if ($validate['status']) {
      try {
        $du = Likes::where('id', $request->id)->update($dataUpdate);
        $dg = Likes::find($request->id);
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
      $delData = Likes::find($id);
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
}
