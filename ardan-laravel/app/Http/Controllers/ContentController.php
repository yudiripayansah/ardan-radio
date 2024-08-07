<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Content;

class ContentController extends Controller
{
  public function __construct()
  {
    $this->middleware('auth:api', ['except' => ['read', 'get']]);
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
    $type = ($request->type) ? $request->type : null;
    $listData = Content::select('content.*')->orderBy($sortBy, $sortDir);
    if ($perPage != '~') {
      $listData->skip($offset)->take($perPage);
    }
    if ($search != null) {
      $listData->whereRaw('(content.title LIKE "%' . $search . '%")');
    }
    if ($type != null) {
      $listData->whereRaw('(content.type LIKE "%' . $type . '%")');
    }
    $listData = $listData->get();
    foreach ($listData as $ld) {
      $ld->image_url = Storage::disk('public')->url('content/' . $ld->image);
    }
    if ($search || $id_user || $type) {
      $total = Content::orderBy($sortBy, $sortDir);
      if ($search) {
        $total->whereRaw('(content.title LIKE "%' . $search . '%")');
      }
      if ($type) {
        $total->whereRaw('(content.type = "' . $type . '")');
      }
      $total = $total->count();
    } else {
      $total = Content::all()->count();
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
      $getData = Content::find($request->id);
      $getData->image = Storage::disk('public')->url('content/' . $getData->image);
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
    if ($request->image) {
      $filename = uniqid() . time() . '-' . '-content.png';
      $filePath = 'content/' . $filename;
      $dataCreate['image'] = $filename;
      Storage::disk('public')->put($filePath, file_get_contents($request->image));
    } else {
      unset($dataCreate['image']);
    }
    DB::beginTransaction();
    $validate = Content::validate($dataCreate);
    if ($validate['status']) {
      try {
        $dc = Content::create($dataCreate);
        $dg = Content::find($dc->id);
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
    $dataFind = Content::find($request->id);
    $validate = Content::validate($dataUpdate);
    if (basename($request->image) != basename($dataFind->image)) {
      $filename = uniqid() . time() . '-' . '-content.png';
      $filePath = 'content/' . $filename;
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
        $du = Content::where('id', $request->id)->update($dataUpdate);
        $dg = Content::find($request->id);
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
      try {
        if(is_array($id)){
          $delData = Content::destroy($id);
        } else {
          $delData = Content::find($id);
          $delData->delete();
        }
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
  public function pin(Request $request)
  {
    $id = $request->id;
    if ($id) {
      $pinData = Content::find($id);
      try {
        $pin = !$pinData->pin;
        $pinData->pin = $pin;
        $pinData->save();
        $res = array(
          'pin' => $pin,
          'status' => true,
          'msg' => 'Data successfully Updated'
        );
      } catch (Exception $e) {
        $res = array(
          'status' => false,
          'msg' => 'Failed to update Data'
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
