<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Events\PublicChatEvents;
use App\Models\LiveChat;
use App\Models\User;
class PublicChatControllers extends Controller
{
  public function __construct() {
    $this->middleware('auth:api', ['except' => ['read', 'send']]);
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
    $listData = LiveChat::select('livechat.*')->orderBy($sortBy, $sortDir);
    if ($perPage != '~') {
      $listData->skip($offset)->take($perPage);
    }
    if ($search != null) {
      $listData->whereRaw('(livechat.title LIKE "%' . $search . '%" OR livechat.chat LIKE "%' . $search . '%")');
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
    foreach ($listData as $ld) {
      $ld->user = User::find($ld->id_user);
      $ld->reciever = User::find($ld->id_target);
      if($ld->user){
        $ld->user->image = ($ld->user->image) ? Storage::disk('public')->url('user/'.$ld->user->image) : null;
        $ld->penyiar = $ld->user->penyiar;
        $ld->verified = $ld->user->verified;
      }
      if($ld->reciever){
        $ld->reciever->image = ($ld->reciever->image) ? Storage::disk('public')->url('user/'.$ld->reciever->image) : null;
      }
      $ld->date = $ld->created_at;
    }
    if ($search || $id_user || $id_target || $target_type) {
      $total = LiveChat::orderBy($sortBy, $sortDir);
      if ($search) {
        $total->whereRaw('(livechat.title LIKE "%' . $search . '%" OR livechat.chat LIKE "%' . $search . '%")');
      }
      if ($id_user) {
        $total->where('id_user', $id_user);
      }
      if ($id_target) {
        $total->where('id_target', $id_target);
      }
      if ($target_type) {
        $total->where('target_type', $target_type);
      }
      $total = $total->count();
    } else {
      $total = LiveChat::all()->count();
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
  public function send(Request $request) {
    $fUser = User::find($request->id_user);
    $id_user = $request->id_user;
    $id_target = $request->id_target;
    $target_type = $request->target_type;
    $title = $request->title;
    $chat = $request->chat;
    $penyiar = $request->penyiar;
    $verified = $request->verified;
    $user = $fUser;
    if($user){
      $user->image = ($user->image) ? Storage::disk('public')->url('user/'.$user->image) : null;
    }
    $dataCreate = [
      'id_user' => $id_user,
      'id_target' => $id_target,
      'target_type' => $target_type,
      'title' => $title,
      'chat' => $chat
    ];
    $dc = LiveChat::create($dataCreate);
    $dg = LiveChat::find($dc->id);
    $date = $dg->created_at;
    broadcast(new PublicChatEvents($id_user,$id_target,$target_type,$title,$chat,$penyiar,$verified,$date,$user))->toOthers();
    return response()->json([$request->all()], 200);
  }
}
