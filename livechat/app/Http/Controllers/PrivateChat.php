<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\PrivateChatEvent;

class PrivateChat extends Controller
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
    	broadcast(new PrivateChatEvent($message,$target,$name))->toOthers();
    }
}
