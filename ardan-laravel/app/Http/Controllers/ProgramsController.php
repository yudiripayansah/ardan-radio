<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Programs;
use App\Models\Penyiar;

class ProgramsController extends Controller
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
    $listData = Programs::select('programs.*')->orderBy($sortBy, $sortDir);
    if ($perPage != '~') {
      $listData->skip($offset)->take($perPage);
    }
    if ($search != null) {
      $listData->whereRaw('(programs.title LIKE "%' . $search . '%")');
    }
    $listData = $listData->get();
    foreach ($listData as $ld) {
      $ld->image_url = Storage::disk('public')->url('programs/' . $ld->image);
    }
    if ($search || $id_user || $type) {
      $total = Programs::orderBy($sortBy, $sortDir);
      if ($search) {
        $total->whereRaw('(programs.title LIKE "%' . $search . '%")');
      }
      $total = $total->count();
    } else {
      $total = Programs::all()->count();
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
    if ($request->id || $request->day || $request->time) {
      if($request->id){
        $getData = Programs::find($request->id);
      }
      if($request->day || $request->time) {
        $time = "TIME(SUBSTRING_INDEX(time,'-',1)) <= TIME('".$request->time."') AND TIME(SUBSTRING_INDEX(time,'-',-1)) >= TIME('".$request->time."')";
        if($request->next) {
          $time = "TIME(SUBSTRING_INDEX(time,'-',-1)) >= TIME('".$request->time."')";
        }
        $getData = Programs::
                  selectRaw("
                    *,
                    SUBSTRING_INDEX(time,'-',1) AS startTime,
                    SUBSTRING_INDEX(time,'-',-1) AS endTime
                  ")
                  ->whereRaw("
                    (
                      ".$time."
                    )
                    AND days LIKE '%".$request->day."%'
                  ")->orderBy('time', 'ASC')->get();
      }
      if ($getData) {
        if(is_countable($getData)) {
          foreach($getData as $g){
            $g->image = Storage::disk('public')->url('programs/' . $g->image);
            $g->days_label = $this->daysLabel($g->days);
            $g->penyiar_name = $this->penyiarName($g->penyiar);
          }
        } else {
          $getData->image = Storage::disk('public')->url('programs/' . $getData->image);
          $getData->days_label = $this->daysLabel($getData->days);
          $getData->penyiar_name = $this->penyiarName($getData->penyiar);
        }
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
      $filename = uniqid() . time() . '-' . '-programs.png';
      $filePath = 'programs/' . $filename;
      $dataCreate['image'] = $filename;
      Storage::disk('public')->put($filePath, file_get_contents($request->image));
    } else {
      unset($dataCreate['image']);
    }
    unset($dataCreate['time_start']);
    unset($dataCreate['time_end']);
    DB::beginTransaction();
    $validate = Programs::validate($dataCreate);
    if ($validate['status']) {
      try {
        $dc = Programs::create($dataCreate);
        $dg = Programs::find($dc->id);
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
    $dataFind = Programs::find($request->id);
    $validate = Programs::validate($dataUpdate);
    if (basename($request->image) != basename($dataFind->image)) {
      $filename = uniqid() . time() . '-' . '-programs.png';
      $filePath = 'programs/' . $filename;
      $dataUpdate['image'] = $filename;
      Storage::disk('public')->put($filePath, file_get_contents($request->image));
    } else {
      unset($dataUpdate['image']);
    }
    unset($dataUpdate['created_at']);
    unset($dataUpdate['updated_at']);
    unset($dataUpdate['deleted_at']);
    unset($dataUpdate['time_start']);
    unset($dataUpdate['time_end']);
    unset($dataUpdate['days_label']);
    unset($dataUpdate['penyiar_name']);
    DB::beginTransaction();
    if ($validate['status']) {
      try {
        $du = Programs::where('id', $request->id)->update($dataUpdate);
        $dg = Programs::find($request->id);
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
      $delData = Programs::find($id);
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
  public function daysLabel($data)
  {
    $days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
    $data = explode(",", $data);
    $theDay = [];
    for ($i = 0; $i < count($data); $i++) {
      array_push($theDay, $days[$data[$i] - 1]);
    }
    return implode(",", $theDay);
  }
  public function penyiarName($data)
  {
    $penyiar = Penyiar::whereRaw("id IN (" . $data . ")")->get();
    $thePenyiar = [];
    foreach ($penyiar as $p) {
      array_push($thePenyiar, $p->name);
    }
    return implode(",", $thePenyiar);
  }
}
