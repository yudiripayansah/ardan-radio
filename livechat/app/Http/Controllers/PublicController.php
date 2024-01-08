<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\PublicChatEvent;

class PublicController extends Controller
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
        $name = $request->name;
        $penyiar = $request->penyiar;
        $verified = $request->verified;
    	broadcast(new PublicChatEvent($message,$target,$name,$penyiar,$verified))->toOthers();
    	return $message;
    }
}
