<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PrivateChatEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;

    public $message;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($message, $target, $name)
    {
        $this->message = $message;
        $this->target = $target;
        $this->name = $name;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('private-chat-room-' . $this->target);
    }
}
