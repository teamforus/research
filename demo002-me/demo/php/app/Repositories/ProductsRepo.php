<?php
namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Interfaces\IProductsRepo;

class ProductsRepo extends BaseRepo implements IProductsRepo
{
    public function __construct(
        Product $model
    ) {
        $this->model = $model;
    }
}