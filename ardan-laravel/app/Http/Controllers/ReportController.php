<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Report;

class ReportController extends Controller
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
    $id_feed = ($request->id_feed) ? $request->id_feed : null;
    $listData = Report::select('report.*')->orderBy($sortBy, $sortDir)->with('user');
    if ($perPage != '~') {
      $listData->skip($offset)->take($perPage);
    }
    if ($search != null) {
      $listData->whereRaw('(report.title LIKE "%' . $search . '%")');
    }
    if ($id_feed != null) {
      $listData->where('id_feed' , $id_feed);
    }
    $listData = $listData->get();
    foreach ($listData as $ld) {
      $ld->created_on = date('Y-m-d H:i:s',strtotime($ld->created_at));
    }
    if ($search || $id_user || $id_feed) {
      $total = Report::orderBy($sortBy, $sortDir);
      if ($search) {
        $total->whereRaw('(report.title LIKE "%' . $search . '%")');
      }
      if ($id_feed) {
        $total->where('id_feed' , $id_feed);
      }
      $total = $total->count();
    } else {
      $total = Report::all()->count();
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
      $getData = Report::find($request->id);
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
    $validate = Report::validate($dataCreate);
    if ($validate['status']) {
      try {
        $dc = Report::create($dataCreate);
        $dg = Report::find($dc->id);
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
    $dataFind = Report::find($request->id);
    $validate = Report::validate($dataUpdate);
    unset($dataUpdate['created_at']);
    unset($dataUpdate['updated_at']);
    unset($dataUpdate['deleted_at']);
    DB::beginTransaction();
    if ($validate['status']) {
      try {
        $du = Report::where('id', $request->id)->update($dataUpdate);
        $dg = Report::find($request->id);
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
      $delData = Report::find($id);
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
