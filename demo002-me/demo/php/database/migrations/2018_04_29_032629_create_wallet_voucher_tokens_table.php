<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWalletVoucherTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wallet_voucher_tokens', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('wallet_voucher_id')->unsigned();
            $table->string('type', 20);
            $table->string('token', 64);
            $table->integer('expires_in')->unsigned();
            $table->timestamps();

            $table->foreign('wallet_voucher_id'
            )->references('id')->on('wallet_vouchers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wallet_voucher_tokens');
    }
}
