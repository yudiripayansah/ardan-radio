<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use App\Models\Penyiar;
use App\Models\User;

class PenyiarController extends Controller
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
    $listData = Penyiar::select('penyiar.*')->orderBy($sortBy, $sortDir);
    if ($perPage != '~') {
        $listData->skip($offset)->take($perPage);
    }
    if ($search != null) {
        $listData->whereRaw('(penyiar.name LIKE "%'.$search.'%")');
    }
    $listData = $listData->get();
    foreach($listData as $ld) {
      $ld->image_url = Storage::disk('public')->url('penyiar/'.$ld->image);
    }
    if ($search || $id_user || $type) {
        $total = Penyiar::orderBy($sortBy, $sortDir);
        if ($search) {
            $total->whereRaw('(penyiar.name LIKE "%'.$search.'%")');
        }
        $total = $total->count();
    } else {
        $total = Penyiar::all()->count();
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
      $getData = Penyiar::find($request->id);
      $getData->image = Storage::disk('public')->url('penyiar/'.$getData->image);
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
      $filename = uniqid().time().'-'. '-penyiar.png';
      $filePath = 'penyiar/' .$filename;
      $dataCreate['image'] = $filename;
      Storage::disk('public')->put($filePath, file_get_contents($request->image));
    } else {
      unset($dataCreate['image']);
    }
    DB::beginTransaction();
    $uc = $this->createUser($request->all());
    $dataCreate['id_user'] = $uc->id;
    $validate = Penyiar::validate($dataCreate);
    if ($validate['status']) {
      try {
        $dc = Penyiar::create($dataCreate);
        $dg = Penyiar::find($dc->id);
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
    $dataFind = Penyiar::find($request->id);
    $validate = Penyiar::validate($dataUpdate);
    if (basename($request->image) != basename($dataFind->image)) {
      $filename = uniqid().time().'-'. '-penyiar.png';
      $filePath = 'penyiar/' .$filename;
      $dataUpdate['image'] = $filename;
      Storage::disk('public')->put($filePath, file_get_contents($request->image));
    } else {
      unset($dataUpdate['image']);
    }
    unset($dataUpdate['created_at']);
    unset($dataUpdate['updated_at']);
    unset($dataUpdate['deleted_at']);
    unset($dataUpdate['category']);
    DB::beginTransaction();
    if ($validate['status']) {
      try {
        if(!$dataFind->id_user){
          $uc = $this->createUser($request->all());
          $dataUpdate['id_user'] = $uc->id;
        }
        $du = Penyiar::where('id',$request->id)->update($dataUpdate);
        $dg = Penyiar::find($request->id);
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
      $delData = Penyiar::find($id);
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
  public function createUser($req) {
    $password = Hash::make(uniqid());
    $dataCreate = [
      'username' => $req['name'].time(),
      'email' => $req['name'].time().'@ardanradio.com',
      'name' => $req['name'],
      'password' => $password,
      'role' => 'member',
      'penyiar' => 'Yes',
      'verified' => 'Yes'
    ];
    if($req['image']) {
      $filename = uniqid().time().'-'. '-users.png';
      $filePath = 'user/' .$filename;
      $image = $filename;
      Storage::disk('public')->put($filePath, file_get_contents($req['image']));
      $dataCreate['image'] = $image;
    }
    $dc = User::create($dataCreate);
    return $dc;
  }
}
