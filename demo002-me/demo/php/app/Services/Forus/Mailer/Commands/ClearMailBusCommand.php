<?php

namespace App\Services\Forus\Mailer\Commands;

use Illuminate\Console\Command;
use App\Services\Forus\Mailer\Models\MailJob;
use App\Services\Forus\Mailer\MailerRepository;

class ClearMailBusCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'forus.services.mailer:clear';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete old mail attachments.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct() {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle() {
        $mailBusRepository = new MailerRepository();
        $mailBusRepository->clearOldAttachments();
    }
}
