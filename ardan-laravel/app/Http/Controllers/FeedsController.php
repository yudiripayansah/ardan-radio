<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Feeds;
use App\Models\Comments;
use App\Models\Likes;

class FeedsController extends Controller
{
  public function __construct() {
    $this->middleware('auth:api', ['except' => ['read', 'get','create', 'update','delete']]);
  }
  public function read(Request $request) {
    $page = ($request->page) ? $request->page : 1;
    $perPage = ($request->perPage) ? $request->perPage : '~';
    $offset = ($page > 1) ? ($page - 1) * $perPage : 0;
    $sortDir = ($request->sortDir) ? $request->sortDir : 'DESC';
    $sortBy = ($request->sortBy) ? $request->sortBy : 'updated_at';
    $search = ($request->search) ? $request->search : null;
    $category = ($request->category) ? $request->category : null;
    $total = 0;
    $totalPage = 1;
    $id_user = ($request->id_user) ? $request->id_user : null;
    $type = ($request->type) ? $request->type : null;
    $status = ($request->status) ? $request->status : null;
    $listData = Feeds::select('feeds.*')->orderBy($sortBy, $sortDir)->with('user');
    if ($perPage != '~') {
        $listData->skip($offset)->take($perPage);
    }
    if ($search != null) {
        $listData->whereRaw('(feeds.title LIKE "%'.$search.'%")');
    }
    if ($category != null) {
        $listData->whereRaw('(feeds.category LIKE "%'.$category.'%")');
    }
    if ($type != null) {
        $listData->where('type',$type);
    }
    if ($id_user != null) {
        $listData->where('id_user',$id_user);
    }
    if ($status != null) {
        $listData->where('status',$status);
    }
    $listData = $listData->get();
    foreach($listData as $ld) {
      $ld->image_url = ($ld->image) ? Storage::disk('public')->url('feeds/'.$ld->image) : null;
      $ld->user->image_url = ($ld->user && $ld->user->image) ? Storage::disk('public')->url('user/'.$ld->user->image) : null;
      $ld->comment_count = Comments::where('id_target',$ld->id)->where('target_type',$ld->type)->count();
      $ld->like_count = Likes::where('id_target',$ld->id)->where('type',$ld->type)->count();
    }
    if ($search || $id_user || $type || $status || $category) {
        $total = Feeds::orderBy($sortBy, $sortDir);
        if ($search) {
            $total->whereRaw('(feeds.title LIKE "%'.$search.'%")');
        }
        if ($category) {
            $total->whereRaw('(feeds.category LIKE "%'.$category.'%")');
        }
        if ($type) {
            $total->where('type', $type);
        }
        if ($id_user) {
            $total->where('id_user', $id_user);
        }
        if ($status) {
            $total->where('status', $status);
        }
        $total = $total->count();
    } else {
        $total = Feeds::all()->count();
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
      $getData = Feeds::with('user')->get()->find($request->id);
      $getData->image_url = ($getData->image) ? Storage::disk('public')->url('feeds/'.$getData->image) : null;
      $getData->image = ($getData->image) ? Storage::disk('public')->url('feeds/'.$getData->image) : null;
      $getData->user->image_url = ($getData->user->image) ? Storage::disk('public')->url('user/'.$getData->user->image) : null;
      $getData->comment_count = Comments::where('id_target',$getData->id)->where('target_type',$getData->type)->count();
      $getData->like_count = Likes::where('id_target',$getData->id)->where('type',$getData->type)->count();
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
      $filename = uniqid().time().'-'. '-feeds.png';
      $filePath = 'feeds/' .$filename;
      $dataCreate['image'] = $filename;
      Storage::disk('public')->put($filePath, file_get_contents($request->image));
    } else {
      unset($dataCreate['image']);
    }
    DB::beginTransaction();
    $validate = Feeds::validate($dataCreate);
    if ($validate['status']) {
      try {
        $dc = Feeds::create($dataCreate);
        $dg = Feeds::find($dc->id);
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
  public function update(Request $request) {
    $dataUpdate = $request->all();
    $dataFind = Feeds::find($request->id);
    $validate = Feeds::validate($dataUpdate);
    if (basename($request->image) != basename($dataFind->image)) {
      $filename = uniqid().time().'-'. '-feeds.png';
      $filePath = 'feeds/' .$filename;
      $dataUpdate['image'] = $filename;
      Storage::disk('public')->put($filePath, file_get_contents($request->image));
    } else {
      unset($dataUpdate['image']);
    }
    unset($dataUpdate['created_at']);
    unset($dataUpdate['updated_at']);
    unset($dataUpdate['deleted_at']);
    unset($dataUpdate['user']);
    unset($dataUpdate['comment_count']);
    unset($dataUpdate['like_count']);
    unset($dataUpdate['image_url']);
    DB::beginTransaction();
    if ($validate['status']) {
      try {
        $du = Feeds::where('id',$request->id)->update($dataUpdate);
        $dg = Feeds::find($request->id);
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
      $delData = Feeds::find($id);
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
