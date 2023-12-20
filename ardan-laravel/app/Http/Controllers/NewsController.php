<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\News;

class NewsController extends Controller
{
  public function __construct() {
    $this->middleware('auth:api', ['except' => ['read', 'get']]);
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
    $type = ($request->type) ? $request->type : null;
    $category = ($request->category) ? $request->category : null;
    $listData = News::select('news.*')->orderBy($sortBy, $sortDir);
    if ($perPage != '~') {
        $listData->skip($offset)->take($perPage);
    }
    if ($search != null) {
        $listData->whereRaw('(news.title LIKE "%'.$search.'%")');
    }
    if ($category != null) {
        $listData->whereRaw('(news.category LIKE "%'.$category.'%")');
    }
    $listData = $listData->get();
    foreach($listData as $ld) {
      $ld->image_url = Storage::disk('public')->url('news/'.$ld->image);
    }
    if ($search || $id_user || $type || $category) {
        $total = News::orderBy($sortBy, $sortDir);
        if ($search) {
            $total->whereRaw('(news.title LIKE "%'.$search.'%")');
        }
        if ($category) {
            $total->whereRaw('(news.category LIKE "%'.$category.'%")');
        }
        $total = $total->count();
    } else {
        $total = News::all()->count();
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
      $getData = News::find($request->id);
      $getData->image = Storage::disk('public')->url('news/'.$getData->image);
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
      $filename = uniqid().time().'-'. '-news.png';
      $filePath = 'news/' .$filename;
      $dataCreate['image'] = $filename;
      Storage::disk('public')->put($filePath, file_get_contents($request->image));
    } else {
      unset($dataCreate['image']);
    }
    DB::beginTransaction();
    $validate = News::validate($dataCreate);
    if ($validate['status']) {
      try {
        $dc = News::create($dataCreate);
        $dg = News::find($dc->id);
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
    $dataFind = News::find($request->id);
    $validate = News::validate($dataUpdate);
    if (basename($request->image) != basename($dataFind->image)) {
      $filename = uniqid().time().'-'. '-news.png';
      $filePath = 'news/' .$filename;
      $dataUpdate['image'] = $filename;
      Storage::disk('public')->put($filePath, file_get_contents($request->image));
    } else {
      unset($dataUpdate['image']);
    }
    unset($dataUpdate['created_at']);
    unset($dataUpdate['updated_at']);
    unset($dataUpdate['deleted_at']);
    DB::beginTransaction();
    if ($validate['status']) {
      try {
        $du = News::where('id',$request->id)->update($dataUpdate);
        $dg = News::find($request->id);
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
      $delData = News::find($id);
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
