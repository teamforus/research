<?php
namespace App\Repositories\Interfaces;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

interface IBaseRepo
{
    /**
     * @param mixed $id
     * @return Model
     */
    public function find($id);

    /**
     * @return mixed
     */
    public function unlinkAll();

    /**
     * @return mixed|Collection
     */
    public function getAll();

    /**
     * @param $id
     * @return mixed|Model
     */
    public function byId($id);

    /**
     * @param array ...$args
     * @return mixed|Model
     */
    public function findWhere(...$args);

    /**
     * @param array ...$args
     * @return mixed|Collection
     */
    public function getWhere(...$args);

    /**
     * @param array ...$args
     * @return mixed|Collection
     */
    public function getWhereIn(...$args);

    /**
     * @param array ...$args
     * @return mixed|\Illuminate\Support\Collection
     */
    public function pluck(...$args);

    /**
     * @param $data
     * @return mixed|Model
     */
    public function create($data);

    /**
     * @return mixed|Model
     */
    public function first();
}