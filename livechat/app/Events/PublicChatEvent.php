<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PublicChatEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;
    public $message;
    public $target;
    public $name;
    public $penyiar;
    public $verified;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($message,$target,$name,$penyiar,$verified)
    {
        $this->message = $message;
        $this->target = $target;
        $this->name = $name;
        $this->penyiar = $penyiar;
        $this->verified = $verified;
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
