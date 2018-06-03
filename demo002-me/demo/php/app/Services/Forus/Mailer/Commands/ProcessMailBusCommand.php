<?php

namespace App\Services\Forus\Mailer\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;

use App\Services\Forus\Mailer\Models\MailJob;
use App\Services\Forus\Mailer\MailerRepository;

class ProcessMailBusCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'forus.services.mailer:process';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process mail bus queue.';

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

        try {
            $mailBusRepository = new MailerRepository();

            $time = time();
            
            while($time + 60 > time()) {
                while($mail = MailJob::getModel()->where([
                    'state' => 'pending'
                ])->first()) {
                    /** @var MailJob $mail */
                    $mailBusRepository->sendMail($mail);

                    if ($time + 60 < time())
                        break;
                }

                sleep(1);
            }
        } catch (\Exception $e) {
            
        }
    }
}
