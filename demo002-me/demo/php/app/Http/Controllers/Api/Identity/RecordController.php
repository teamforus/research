<?php

namespace App\Http\Controllers\Api\Identity;

use App\Http\Requests\Api\Records\RecordStoreRequest;
use App\Http\Requests\Api\Records\RecordUpdateRequest;
use App\Models\Intent;
use App\Models\Validator;
use App\Services\Forus\Identity\Models\Identity;
use App\Services\Forus\Record\Models\Record;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RecordController extends Controller
{
    private $recordRepo;

    /**
     * RecordCategoryController constructor.
     */
    public function __construct() {
        $this->recordRepo = app()->make('forus.services.record');
    }

    /**
     * Get list records
     * @param Request $request
     * @return array
     */
    public function index(Request $request)
    {
        return $this->recordRepo->recordsList(
            $request->get('identity')
        );
    }

    /**
     * Create new record
     * @param RecordStoreRequest $request
     * @return array|bool
     * @throws \Exception
     */
    public function store(RecordStoreRequest $request)
    {
        return $this->recordRepo->recordCreate(
            $request->get('identity'),
            $request->get('key'),
            $request->get('value'),
            $request->get('record_category_id', null),
            $request->get('order', null)
        );
    }


    /**
     * Get record
     * @param Request $request
     * @param int $recordId
     * @return array
     */
    public function show(
        Request $request,
        int $recordId
    ) {
        $identity = $request->get('identity');
        $records = $this->recordRepo->recordGet($identity, $recordId);

        if (empty($records)) {
            abort(404, trans('records.codes.404'));
        }

        return $records;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  RecordUpdateRequest  $request
     * @param  int  $recordId
     * @return \Illuminate\Http\Response
     */
    public function update(
        RecordUpdateRequest $request,
        int $recordId
    ) {
        $identity = $request->get('identity');

        if (empty($this->recordRepo->recordGet(
            $identity, $recordId
        ))) {
            abort(404, trans('records.codes.404'));
        }

        $success = $this->recordRepo->recordUpdate(
            $request->get('identity'),
            $recordId,
            $request->input('record_category_id', null),
            $request->input('order', null)
        );

        return compact('success');
    }

    /**
     * Delete record
     * @param Request $request
     * @param int $recordId
     * @return array
     * @throws \Exception
     */
    public function destroy(
        Request $request,
        int $recordId
    ) {
        $identity = $request->get('identity');

        if (empty($this->recordRepo->recordGet(
            $identity, $recordId
        ))) {
            abort(404, trans('records.codes.404'));
        }

        $success = $this->recordRepo->recordDelete(
            $request->get('identity'),
            $recordId
        );

        return compact('success');
    }

    /**
     * Sort records
     * @param Request $request
     * @return array
     */
    public function sort(
        Request $request
    ) {
        $this->recordRepo->recordsSort(
            $request->get('identity'),
            collect($request->get('records', []))->toArray()
        );

        $success = true;

        return compact('success');
    }

    /**
     * Get available record type keys
     * @return array
     */
    public function typeKeys() {
        return $this->recordRepo->getRecordTypes();
    }

    public function validateRecord($recordId) {
        /** @var \App\Services\Forus\Record\Models\Record $record */
        $record = Record::getModel()->where([
            'id' => $recordId,
        ])->first();

        $record->validations()->create([
            'validator_id' => Validator::getModel()->where('key', 'digid')->first()->id,
            'state' => 'success'
        ]);

        return [
            'success' => true
        ];
    }

    public function makeValidationIntent(Request $request, $recordId) {
        $identity = Identity::getModel()->find($request->get('identity'));

        $intent = Intent::create([
            'token' => app()->make('uuid_generator')->generate(42),
            'identity_id' => $identity->id,
            'state' => 'pending',
            'type' => 'validate_record'
        ]);

        $intent->metas()->create([
            'key' => 'record_id',
            'value' => $recordId
        ]);

        return collect($intent)->only('token');
    }

    public function viewValidationIntent($intentToken) {
        $intent = Intent::getModel()->where([
            'token' => $intentToken
        ])->first();

        $identity = Identity::getModel()->find($intent->identity_id);

        /** @var Record $record */
        $record = Record::getModel()->where([
            'identity_id' => $identity->id,
            'id' => $intent->metas()->where('key', 'record_id')->first()->value
        ])->first();

        $state = $intent->state;

        $intent->update([
            'state' => 'progress'
        ]);

        return [
            'id' => $record->id,
            'value' => $record->value,
            'type' => $record->record_type->name,
            'state' => $state
        ];
    }

    public function acceptValidationIntent($intentToken) {
        $intent = Intent::getModel()->where([
            'token' => $intentToken
        ])->first();

        $this->validateRecord(
            $intent->metas()->where('key', 'record_id')->first()->value
        );

        $intent->update([
            'state' => 'accepted'
        ]);
    }

    public function declineValidationIntent($intentToken) {
        $intent = Intent::getModel()->where([
            'token' => $intentToken
        ])->first();

        $intent->update([
            'state' => 'declined'
        ]);
    }
}
