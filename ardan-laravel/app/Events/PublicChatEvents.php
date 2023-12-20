<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PublicChatEvents implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;

    public $message;
    public $name;
    public $target;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($name,$target,$message)
    {
        $this->name = $name;
        $this->target = $target;
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('publicChat');
    }
}
