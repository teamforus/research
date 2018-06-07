<?php
namespace App\Repositories;

use App\Models\Token;
use App\Repositories\Interfaces\ITokensRepo;

class TokensRepo extends BaseRepo implements ITokensRepo
{
    public function __construct(
        Token $model
    ) {
        $this->model = $model;
    }
}