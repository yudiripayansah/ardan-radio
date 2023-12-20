<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\PublicChatEvents;

class PublicChatControllers extends Controller
{
    public function send(Request $request) {
        $message = $request->message;
        $name = $request->name;
        $target = $request->target;
    	broadcast(new PublicChatEvents($name,$target,$message))->toOthers();
        return response()->json([$request->all()], 200);
    }
}
