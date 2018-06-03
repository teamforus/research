<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Language
 * @property mixed $id
 * @property string $locale
 * @property string $name
 * @property boolean $base
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 */
class Language extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'locale', 'name', 'base'
    ];
}
