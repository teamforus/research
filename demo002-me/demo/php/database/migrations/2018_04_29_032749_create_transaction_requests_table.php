<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaction_requests', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('token_id')->unsigned();
            $table->integer('from_wallet_id')->unsigned();
            $table->integer('to_wallet_id')->unsigned();
            $table->integer('transaction_id')->unsigned();
            $table->integer('amount')->unsigned();
            $table->string('type', 10);
            $table->string('state', 10);
            $table->string('token_string', 64);
            $table->timestamps();

            $table->foreign('token_id'
            )->references('id')->on('tokens')->onDelete('cascade');

            $table->foreign('from_wallet_id'
            )->references('id')->on('wallets')->onDelete('cascade');

            $table->foreign('to_wallet_id'
            )->references('id')->on('wallets')->onDelete('cascade');

            $table->foreign('transaction_id'
            )->references('id')->on('transactions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transaction_requests');
    }
}
