<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ForgotMail extends Mailable
{
    use Queueable, SerializesModels;
    protected $mailData;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($mailData)
    {
        //
        $this->mailData = $mailData;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $address = $this->mailData->to;
        $subject = $this->mailData->subject;
        $name = $this->mailData->name;
        $cc = $this->mailData->cc;
        $bcc = $this->mailData->bcc;
        $from = $this->mailData->from;
        return $this->view('email.forgot')
            ->from($from, $name)
            ->cc($address, $name)
            ->bcc($cc, $name)
            ->replyTo($from, $name)
            ->subject($subject)
            ->with(['data' => $this->mailData,'message' => $this]);;
    }
}
