<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\VoteStoreRequest;
use App\Http\Requests\Api\VoteUpdateRequest;
use App\Models\Vote;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VoteController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function index()
    {
        return app(Vote::class)->get();
    }

    /**
     * Store a newly created resource in storage.
     * @param VoteStoreRequest $request
     * @return array
     */
    public function store(VoteStoreRequest $request)
    {
        /**
         * @var Vote $vote
         */
        $authUser = $request->get('auth_user');

        $vote = app(Vote::class)->create(collect($request->only('title', 'description'))->merge([
            'state' => 'pending',
            'user_id' => $authUser->id
        ])->toArray());

        $options = collect($request->input('options'))->sortBy('price')->map(function($option, $index) {
            $option['order'] = $index;
            return $option;
        })->toArray();

        $vote->options()->createMany($options);

        return ['success' => !!$vote];
    }

    /**
     * Display the specified resource.
     * @param Vote $vote
     * @return Vote|array
     */
    public function show(Vote $vote)
    {
        $vote = $vote->load(['options.responses'])->toArray();

        $vote['options'] = collect($vote['options'])->map(function($option) {
            return array_merge(collect($option)->toArray(), [
                'responses' => count($option['responses'])
            ]);
        })->toArray();

        return $vote;
    }

    /**
     * Update the specified resource in storage.
     * @param VoteUpdateRequest $request
     * @param Vote $vote
     * @return array
     */
    public function update(VoteUpdateRequest $request, Vote $vote)
    {
        $vote->update($request->only(['title', 'description']));
        $options = collect($request->input('options', []));
        $idsToKeep = $options->filter(function($option) {
            return isset($option['id']) && $option['id'];
        })->pluck('id')->toArray();

        $vote->options()->whereNotIn('id', $idsToKeep)->delete();

        $options->each(function($option) use ($vote) {
            if (isset($option['id']) && ($optionModel = $vote->options()->where([
                    'vote_options.id' => $option['id']
                ])->first())) {
                $optionModel->update($option);
            } else {
                $vote->options()->create($option);
            }
        });

        return ['success' => !!$vote];
    }

    /**
     * Remove the specified resource from storage.
     * @param Vote $vote
     * @return array
     * @throws \Exception
     */
    public function destroy(Vote $vote)
    {
        return [
            'success' => !!$vote->delete()
        ];
    }

    /**
     * Returns active voting
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function active(Request $request) {
        /**
         * @var Vote $vote
         */
        $authUser = $request->get('auth_user');

        if ($authUser->stem_points < 1) {
            return response([
                'title' => 'Error!',
                'desc' => 'Not enough Stem points!',
                'type' => 'danger'
            ], 403);
        }

        $vote = app(Vote::class)->where([
            'state' => 'active'
        ])->first();

        if (!$vote) {
            return response([
                'title' => 'No voting!',
                'desc' => 'No active voting!',
                'type' => 'info'
            ], 403);
        }

        return $vote->load(['options']);
    }

    /**
     * Activate selected vote
     * @param Vote $vote
     * @return array
     */
    public function activate(Vote $vote) {
        app(Vote::class)->where([
            'state' => 'active'
        ])->update([
            'state' => 'completed'
        ]);

        return [
            'success' => $vote->update([
                'state' => 'active'
            ])
        ];
    }

    /**
     * Make vote response
     * @param Request $request
     * @param Vote $vote
     * @return array
     */
    public function vote(Request $request, Vote $vote) {
        /**
         * @var Vote $vote
         */
        $authUser = $request->get('auth_user');

        if ($authUser->stem_points < 1) {
            return response([
                'title' => 'Not available!',
                'desc' => 'Not enough Stem points!',
                'type' => 'info'
            ], 403);
        }

        $voteResponse = $vote->responses()->create([
            'vote_option_id' => $request->input('vote_option_id'),
            'user_id' => $authUser->id
        ]);

        $authUser->stem_points -= 1;
        $authUser->save();

        return [
            'success' => !!$voteResponse
        ];
    }
}
