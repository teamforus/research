<?php
namespace App\Repositories;

use App\Models\Transaction;
use App\Repositories\Interfaces\ITransactionsRepo;

class TransactionsRepo extends BaseRepo implements ITransactionsRepo
{
    public function __construct(
        Transaction $model
    ) {
        $this->model = $model;
    }
}