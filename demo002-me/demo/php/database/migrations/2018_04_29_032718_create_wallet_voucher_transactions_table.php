<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWalletVoucherTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wallet_voucher_transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('token_id')->unsigned();
            $table->integer('provider_id')->unsigned();
            $table->integer('wallet_voucher_id')->unsigned();
            $table->integer('amount');
            $table->string('type', 20);
            $table->string('state', 20);
            $table->timestamps();

            $table->foreign('token_id'
            )->references('id')->on('tokens')->onDelete('cascade');

            $table->foreign('provider_id'
            )->references('id')->on('providers')->onDelete('cascade');

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
        Schema::dropIfExists('wallet_voucher_transactions');
    }
}
