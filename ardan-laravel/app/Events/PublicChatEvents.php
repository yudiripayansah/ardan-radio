<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PublicChatEvents implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;
    public $id_user;
    public $id_target;
    public $target_type;
    public $title;
    public $chat;
    public $penyiar;
    public $verified;
    public $date;
    public $user;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($id_user,$id_target,$target_type,$title,$chat,$penyiar,$verified,$date,$user)
    {
        $this->id_user = $id_user;
        $this->id_target = $id_target;
        $this->target_type = $target_type;
        $this->title = $title;
        $this->chat = $chat;
        $this->penyiar = $penyiar;
        $this->verified = $verified;
        $this->date = $date;
        $this->user = $user;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('publicChat');
    }
}
