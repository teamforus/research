<?php

namespace App\Services\Forus\Mailer;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use App\Services\UUIDGeneratorService\Facades\UUIDGenerator;

class MailerService
{
    protected $mailBusRepository;

    public function __construct() {
        $this->mailBusRepository = new MailerRepository();
    }

    public function getQueue()
    {
        return Models\MailJob::getModel()->get();
    }

    public function push($view, $scope, $message, $attachments = []) {
        return $this->mailBusRepository->push(
            $view, $scope, $message, $attachments
        );
    }
}