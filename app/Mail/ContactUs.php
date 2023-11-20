<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactUs extends Mailable
{
    use Queueable, SerializesModels;

    protected $username;
    protected $email;
    protected $message;

    public function __construct($username,$email,$message)
    {
        $this->username = $username;
        $this->email = $email;
        $this->message = $message;
    }

    public function build(){
        return $this->subject('Contact Us')
        ->view('emails.Inquiry')
        ->with([
            'name' => $this->username,
            'email' => $this->email,
            'inquiryMessage' => $this->message
        ]);
    }
}
