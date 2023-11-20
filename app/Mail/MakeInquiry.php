<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MakeInquiry extends Mailable
{
    use Queueable, SerializesModels;

    protected $user;
    protected $message;

    public function __construct($user,$message) {
        $this->user = $user;
        $this->message = $message;
    }

    public function build() {
        return $this->subject("Making an Inquiry")
        ->view('emails.Inquiry')
        ->with([
            'name' => $this->user->first_name . " ". $this->user->last_name ,
            'email' => $this->user->email,
            'inquiryMessage' => $this->message
        ]);

    }

    

}
