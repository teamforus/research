<?php

namespace App\Services\Forus\Record\Repositories\Interfaces;

interface IRecordRepo {
    /**
     * Create or update records for given identity
     * @param $identityId
     * @param array $records
     * @return \Illuminate\Support\Collection
     */
    public function updateRecords(
        $identityId,
        array $records
    );

    /**
    * Get list all available record type keys
    * @return array
    */
    public function getRecordTypes();


    /**
     * Check if record type and value is unique
     * @param string $recordTypeKey
     * @param string $recordValue
     * @param mixed $excludeIdentity
     * @return mixed
     * @throws \Exception
     */
    public function isRecordUnique(
        string $recordTypeKey,
        string $recordValue,
        string $excludeIdentity = null
    );

    /**
     * Check if record type and value is already existing
     * @param string $recordTypeKey
     * @param string $recordValue
     * @param mixed $excludeIdentity
     * @return mixed
     * @throws \Exception
     */
    public function isRecordExists(
        string $recordTypeKey,
        string $recordValue,
        string $excludeIdentity = null
    );


    /**
     * Get identity id by email record
     * @param string $email
     * @return mixed
     */
    public function identityIdByEmail(
        string $email
    );

    /**
     * Get type id by key
     * @param string $key
     * @return mixed
     */
    public function getTypeIdByKey(
        string $key
    );

    /**
     * Add new record category to identity
     * @param mixed $identityId
     * @param string $name
     * @param int $order
     * @return array|null
     */
    public function categoryCreate(
        $identityId,
        string $name,
        int $order
    );

    /**
     * Get identity record categories
     * @param mixed $identityId
     * @return array
     */
    public function categoriesList(
        $identityId
    );

    /**
     * Get identity record category
     * @param mixed $identityId
     * @param mixed $recordCategoryId
     * @return array|null
     */
    public function categoryGet(
        $identityId,
        $recordCategoryId
    );

    /**
     * Update identity record category
     * @param mixed $identityId
     * @param mixed $recordCategoryId
     * @param string|null $name
     * @param int|null $order
     * @return bool
     */
    public function categoryUpdate(
        $identityId,
        $recordCategoryId,
        string $name,
        int $order = null
    );

    /**
     * Sort categories
     * @param mixed $identityId
     * @param array $orders
     * @return void
     */
    public function categoriesSort(
        $identityId,
        array $orders
    );

    /**
     * Delete category
     * @param mixed $identityId
     * @param mixed $recordCategoryId
     * @return mixed
     * @throws \Exception
     */
    public function categoryDelete(
        $identityId,
        $recordCategoryId
    );

    /**
     * Get identity records
     * @param mixed $identityId
     * @return array
     */
    public function recordsList(
        $identityId
    );

    /**
     * Get identity record
     * @param mixed $identityId
     * @param mixed $recordId
     * @return array
     */
    public function recordGet(
        $identityId,
        $recordId
    );

    /**
     * Get identity record by key
     * @param mixed $identityId
     * @param mixed $typeKey
     * @return mixed
     */
    public function recordGetByKey(
        $identityId,
        $typeKey
    );

    /**
     * Add new record to identity
     * @param mixed $identityId
     * @param string $typeKey
     * @param string $value
     * @param mixed|null $recordCategoryId
     * @param integer|null $order
     * @return bool|array
     */
    public function recordCreate(
        $identityId,
        string $typeKey,
        string $value,
        $recordCategoryId = null,
        $order = null
    );

    /**
     * Update record
     * @param mixed $identityId
     * @param mixed $recordId
     * @param mixed|null $recordCategoryId
     * @param integer|null $order
     * @return bool
     */
    public function recordUpdate(
        $identityId,
        $recordId,
        $recordCategoryId = null,
        $order = null
    );

    /**
     * Sort records
     * @param mixed $identityId
     * @param array $orders
     * @return void
     */
    public function recordsSort(
        $identityId,
        array $orders
    );

    /**
     * Delete record
     * @param mixed $identityId
     * @param mixed $recordId
     * @return bool
     * @throws \Exception
     */
    public function recordDelete(
        $identityId,
        $recordId
    );
}
