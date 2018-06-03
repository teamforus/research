<?php

namespace App\Services\Forus\Mailer\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class MailJob
 * @property mixed $id
 * @property string $payload
 * @property string $state
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Services\MailerService\Models
 */
class MailJob extends Model
{
    protected $fillable = [
        'payload', 'state'
    ];
}
