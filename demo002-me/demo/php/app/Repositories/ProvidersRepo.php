<?php
namespace App\Repositories;

use App\Models\Provider;
use App\Repositories\Interfaces\IProvidersRepo;

class ProvidersRepo extends BaseRepo implements IProvidersRepo
{
    public function __construct(
        Provider $model
    ) {
        $this->model = $model;
    }
}