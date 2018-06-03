<?php
namespace App\Repositories;

use App\Models\Fund;
use App\Repositories\Interfaces\IFundsRepo;

class FundsRepo extends BaseRepo implements IFundsRepo
{
    public function __construct(
        Fund $model
    ) {
        $this->model = $model;
    }
}