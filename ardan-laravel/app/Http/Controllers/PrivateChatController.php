<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\PrivateMessageEvent;
use App\Models\User;
use App\Models\ChatRoom;
use App\Models\Message;
use App\Models\Receiver;

class PrivateChatController extends Controller
{
	public function __construct()
	{
  }
  public function get(Request $request)
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
    $chat_room_id = ($request->chat_room_id) ? $request->chat_room_id : null;
    $listData = Message::select('messages.*')->with('sender')->orderBy($sortBy, $sortDir);
    if ($perPage != '~') {
      $listData->skip($offset)->take($perPage);
    }
    if ($search != null) {
      $listData->whereRaw('(messages.message LIKE "%' . $search . '%")');
    }
    if ($id_user != null) {
      $listData->where('id_user',$id_user);
    }
    if ($id_target != null) {
      $listData->where('id_target',$id_target);
    }
    if ($chat_room_id != null) {
      $listData->where('chat_room_id',$chat_room_id);
    }
    $listData = $listData->get();
    foreach ($listData as $ld) {

    }
    if ($search || $id_user || $id_target || $chat_room_id) {
      $total = Message::orderBy($sortBy, $sortDir);
      if ($search) {
        $total->whereRaw('(messages.message LIKE "%' . $search . '%")');
      }
      if ($id_user) {
        $total->where('id_user', $id_user);
      }
      if ($id_target) {
        $total->where('id_target', $id_target);
      }
      if ($chat_room_id) {
        $total->where('chat_room_id', $chat_room_id);
      }
      $total = $total->count();
    } else {
      $total = Message::all()->count();
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
  public function index(Request $request)
  {
    $receiver = User::find($request->reciever);
    $roomMembers = [$request->reciever, $request->sender];
    sort($roomMembers);
    $roomMembers = implode($roomMembers, ',');
    
    $chatRoom = ChatRoom::where('user_ids', $roomMembers)->first();
    if(is_null($chatRoom)) {
        $chatRoom = new ChatRoom;
        $chatRoom->room_type = 'private';
        $chatRoom->user_ids = $roomMembers;
        $chatRoom->save();
    }

    $res = array(
      'status' => true,
      'msg' => 'Success',
      'data' => [
        'chatRoom' => $chatRoom,
        'reciever' => $receiver
      ]
    );
    return response()->json($res, 200);
  }
  public function send(Request $request)
  {
    $message = new Message;
    $message->chat_room_id = $request->chat_room_id;
    $message->sender_id = $request->sender_id;
    $message->message = $request->message;;
    $message->save();
    $receiver = new Receiver;
    $receiver->message_id = $message->id;
    $receiver->receiver_id = $request->reciever_id;
    if($receiver->save()) {
      $message = Message::with('sender')->find($message->id);
      broadcast(new PrivateMessageEvent($message))->toOthers();
      $res = array(
        'status' => true,
        'msg' => 'Success',
        'data' => [
          'message' => $message
        ]
      );
    } else {
      $res = array(
        'status' => true,
        'msg' => 'Failed'
      );
    }
    return response()->json($res, 200);
  }
}
