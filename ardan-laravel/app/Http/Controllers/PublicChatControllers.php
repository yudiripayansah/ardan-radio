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
        $penyiar = $request->penyiar;
        $verified = $request->verified;
    	broadcast(new PublicChatEvents($name,$target,$message,$penyiar,$verified))->toOthers();
        return response()->json([$request->all()], 200);
    }
}
