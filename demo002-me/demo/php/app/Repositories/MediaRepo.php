<?php
namespace App\Repositories;

use App\Models\Media;
use App\Repositories\Interfaces\IMediaRepo;

class MediaRepo extends BaseRepo implements IMediaRepo
{
    public function __construct(
        Media $model
    ) {
        $this->model = $model;
    }
}