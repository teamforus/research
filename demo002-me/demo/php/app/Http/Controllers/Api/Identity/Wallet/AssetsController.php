<?php

namespace App\Http\Controllers\Api\Identity\Wallet;

use App\Http\Requests\Api\Wallets\Assets\UpdateAssetRequest;
use App\Services\Forus\Identity\Models\Identity;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AssetsController extends Controller
{
    public function index(Request $request) {
        $identity = Identity::whereKey($request->get('identity'))->first();

        return $identity->wallet->assets;
    }

    public function update(UpdateAssetRequest $request, $assetId) {
        $identity = Identity::whereKey($request->get('identity'))->first();

        $identity->wallet->assets()->whereKey($assetId)->first()->update($request->all());
    }
}
