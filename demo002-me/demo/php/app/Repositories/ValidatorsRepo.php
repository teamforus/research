<?php
namespace App\Repositories;

use App\Models\Validator;
use App\Repositories\Interfaces\IValidatorsRepo;

class ValidatorsRepo extends BaseRepo implements IValidatorsRepo
{
    public function __construct(
        Validator $model
    ) {
        $this->model = $model;
    }
}