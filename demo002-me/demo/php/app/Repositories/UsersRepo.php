<?php
namespace App\Repositories;

use App\Repositories\Interfaces\IUsersRepo;
use App\Models\User;

class UsersRepo extends BaseRepo implements IUsersRepo
{
    public function __construct(
        User $model
    ) {
        $this->model = $model;
    }
}