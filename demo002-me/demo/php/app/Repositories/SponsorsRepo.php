<?php
namespace App\Repositories;

use App\Models\Sponsor;
use App\Repositories\Interfaces\ISponsorsRepo;

class SponsorsRepo extends BaseRepo implements ISponsorsRepo
{
    public function __construct(
        Sponsor $model
    ) {
        $this->model = $model;
    }
}