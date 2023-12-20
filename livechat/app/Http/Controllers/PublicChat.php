<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\PublicChatEvent;

class PublicChat extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
			
    }

    public function send(Request $request)
    {
			$message = $request->message;
			$target = $request->target;
			$name = $request->message;
    	broadcast(new PublicChatEvent($message,$target,$name))->toOthers();
    }
}
