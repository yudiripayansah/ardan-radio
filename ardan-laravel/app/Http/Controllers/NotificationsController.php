<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Notifications;
use Notification;
use App\Notifications\SendPushNotification;
use Kutia\Larafirebase\Messages\FirebaseMessage;

class NotificationsController extends Controller
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
    $listData = Notifications::select('notifications.*')->orderBy($sortBy, $sortDir);
    if ($perPage != '~') {
        $listData->skip($offset)->take($perPage);
    }
    if ($search != null) {
        $listData->whereRaw('(notifications.title LIKE "%'.$search.'%")');
    }
    $listData = $listData->get();
    foreach($listData as $ld) {
      $ld->image_url = Storage::disk('public')->url('notifications/'.$ld->image);
    }
    if ($search || $id_user || $type) {
        $total = Notifications::orderBy($sortBy, $sortDir);
        if ($search) {
            $total->whereRaw('(notifications.title LIKE "%'.$search.'%")');
        }
        $total = $total->count();
    } else {
        $total = Notifications::all()->count();
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
      $getData = Notifications::find($request->id);
      $getData->image = Storage::disk('public')->url('notifications/'.$getData->image);
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
      $filename = uniqid().time().'-'. '-notifications.png';
      $filePath = 'notifications/' .$filename;
      $dataCreate['image'] = $filename;
      Storage::disk('public')->put($filePath, file_get_contents($request->image));
    } else {
      unset($dataCreate['image']);
    }
    DB::beginTransaction();
    $validate = Notifications::validate($dataCreate);
    if ($validate['status']) {
      try {
        $dc = Notifications::create($dataCreate);
        $dg = Notifications::find($dc->id);
        $dg->image = Storage::disk('public')->url('notifications/'.$dg->image);
        $notif = $this->notif(
          $dg->title,
          $dg->text,
          $dg->image,
          null,
          [
            'type' => $dg->type
          ],
          $dg->target
        );
        $res = array(
                'status' => true,
                'data' => $dg,
                'notif' => $notif,
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
    $dataFind = Notifications::find($request->id);
    $validate = Notifications::validate($dataUpdate);
    if (basename($request->image) != basename($dataFind->image)) {
      $filename = uniqid().time().'-'. '-notifications.png';
      $filePath = 'notifications/' .$filename;
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
        $du = Notifications::where('id',$request->id)->update($dataUpdate);
        $dg = Notifications::find($request->id);
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
      $delData = Notifications::find($id);
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
  public function sendOnly(Request $request) {

  }
  function notif($title,$message,$image,$icon='https://mobileapps.ardanradio.com/resources/assets/img/ardan/logo.png',$data,$tokens){
    $fcm = (new FirebaseMessage);
    $fcm = $fcm->withTitle($title);
    $fcm = $fcm->withBody($message);
    if($image){
      $fcm = $fcm->withImage($image);
    }
    if($icon){
      $fcm = $fcm->withIcon($icon);
    }
    $fcm = $fcm->withSound('default');
    $fcm = $fcm->withClickAction('https://www.google.com');
    $fcm = $fcm->withPriority('high');
    if($data){
      $fcm = $fcm->withAdditionalData($data);
    }
    $fcm = $fcm->asNotification($tokens);
    return $fcm;
  }
}
