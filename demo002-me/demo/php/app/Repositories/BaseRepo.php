<?php
namespace App\Repositories;

use App\Repositories\Interfaces\IBaseRepo;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepo implements IBaseRepo
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * @param mixed $id
     * @return Model
     */
    public function find($id) {
        return $this->model->find($id);
    }

    /**
     * @return mixed|void
     */
    public function unlinkAll() {
        $this->model->all()->each(function($model) {
            /**
             * @var Model $model
             */
            if (method_exists($model, 'unlink')) {
                return $model->unlink();
            }

            return $model->delete();
        });
    }

    /**
     * @return Collection|mixed|static[]
     */
    public function getAll()
    {
        return $this->model->all();
    }

    /**
     * @param $id
     * @return Model|mixed|null|static
     */
    public function byId($id)
    {
        return $this->model->whereKey($id)->first();
    }

    /**
     * @param array ...$args
     * @return Model|mixed
     */
    public function findWhere(...$args)
    {
        return call_user_func_array([$this->model, 'where'], $args)->first();
    }

    /**
     * @param array ...$args
     * @return Collection|mixed
     */
    public function getWhere(...$args)
    {
        return call_user_func_array([$this->model, 'where'], $args)->get();
    }

    /**
     * @param array ...$args
     * @return Collection|mixed
     */
    public function getWhereIn(...$args) {
        return call_user_func_array([$this->model, 'whereIn'], $args)->get();
    }

    /**
     * @param array ...$args
     * @return \Illuminate\Support\Collection|mixed
     */
    public function pluck(...$args) {
        return call_user_func_array([$this->model, 'pluck'], $args);
    }

    /**
     * @param $data
     * @return $this|Model|mixed
     */
    public function create($data)
    {
        return $this->model->create($data);
    }

    /**
     * @return mixed|Model
     */
    public function first() {
        return $this->model->first();
    }
}