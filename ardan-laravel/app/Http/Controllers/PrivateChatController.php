<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Events\PrivateMessageEvent;
use App\Models\User;
use App\Models\ChatRoom;
use App\Models\Message;
use App\Models\Receiver;
use App\Models\UserToken;
use Kutia\Larafirebase\Messages\FirebaseMessage;

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
    $sender = User::find($request->sender_id);
    $userToken = UserToken::where('id_user', $request->reciever_id)->get();
    if($receiver->save()) {
      $message = Message::with('sender')->find($message->id);
      broadcast(new PrivateMessageEvent($message))->toOthers();
      // if($user->online == 'No') {
      $notif = new \stdClass();
      $notif->title = 'You have new message from '.$sender->name;
      $notif->message = $request->message;
      $notif->tokens = $userToken;
      $notif->id_user_target = $request->reciever_id;
      $notif->image = null;
      $notif->icon = null;
      $this->notif($notif);
      // }
      $res = array(
        'status' => true,
        'msg' => 'Success',
        'data' => [
          'message' => $message,
          'token' => $userToken
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

  public function messageList(Request $request)
  {
    $user_id = $request->user_id;
    $data = Message::select('messages.*','receivers.*',DB::raw('MAX(messages.id) as msg_id'))->with('sender')
                    ->leftJoin('users as s','messages.sender_id','s.id')
                    ->leftJoin('receivers','messages.id','receivers.message_id')
                    ->leftJoin('users as r','receivers.receiver_id','r.id')
                    ->whereRaw('(messages.sender_id = '.$user_id.' OR receivers.receiver_id = '.$user_id.')')
                    ->groupBy('messages.chat_room_id')
                    ->orderBy('msg_id','DESC')
                    ->get();
    foreach($data as $d) {
      $d->receiver = User::find($d->receiver_id);
      $d->message = Message::find($d->msg_id);
      $d->message->on = date('Y-m-d H:i',strtotime($d->message->created_at));
      $d->receiver->image_url = ($d->receiver->image) ? Storage::disk('public')->url('user/'.$d->receiver->image) : null;
      $d->sender->image_url = ($d->sender->image) ? Storage::disk('public')->url('user/'.$d->sender->image) : null;
      $d->on = date('Y-m-d H:i',strtotime($d->created_at));
      if($user_id == $d->sender->id) {
        $d->with = $d->receiver;
      } else {
        $d->with = $d->sender;
      }
    }
    $res = [
      'status' => true,
      'data' => $data
    ];
    return response()->json($res, 200);
  }
  function notif($data){
    $tokens = [];
    foreach($data->tokens as $t){
      array_push($tokens, $t->token);
    }
    if($data->id_user_target == 'all') {
      $getToken = UserToken::all();
      foreach($getToken as $t){
        array_push($tokens, $t->token);
      }
    }
    if(count($tokens) > 0){
      $fcm = (new FirebaseMessage);
      $fcm = $fcm->withTitle($data->title);
      $fcm = $fcm->withBody($data->message);
      if($data->image){
        $fcm = $fcm->withImage($data->image);
      }
      if($data->icon){
        $fcm = $fcm->withIcon($data->icon);
      }
      $fcm = $fcm->withSound('default');
      $fcm = $fcm->withPriority('high');
      $fcm = $fcm->withAdditionalData($data);
      $fcm = $fcm->asNotification($tokens);
    } else {
      $fcm = 'No token to send';
    }
    return $fcm;
  }
}
