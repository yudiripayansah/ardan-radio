<?
namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Kutia\Larafirebase\Messages\FirebaseMessage;

class SendPushNotification extends Notification
{
    use Queueable;

    protected $title;
    protected $message;
    protected $tokens;
    protected $image;
    protected $icon;
    protected $data;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($title,$message,$image,$icon,$data,$tokens)
    {
        $this->title = $title;
        $this->message = $message;
        $this->image = $image;
        $this->icon = $icon;
        $this->data = $data;
        $this->tokens = $tokens;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['firebase'];
    }

    public function toFirebase($notifiable)
    {
        return (new FirebaseMessage)
            ->withTitle($this->title)
            ->withBody($this->message)
            ->withImage($this->image)
            ->withIcon($this->icon)
            ->withSound('default')
            ->withClickAction('https://www.google.com')
            ->withPriority('high')
            ->withAdditionalData($this->data)
            ->asNotification($this->tokens);
    }
}
?>