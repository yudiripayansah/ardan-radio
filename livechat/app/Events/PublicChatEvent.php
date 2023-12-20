<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Models\Message;

class PublicChatEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;

    public $message;
    public $target;
    public $name;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($message,$target,$name)
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
        return new Channel('publicChat');
    }
}
