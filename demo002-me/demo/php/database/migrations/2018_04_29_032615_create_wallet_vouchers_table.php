<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWalletVouchersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wallet_vouchers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('wallet_id')->unsigned();
            $table->integer('token_id')->unsigned();
            $table->integer('product_id')->unsigned()->nullable();
            $table->integer('amount')->unsigned();
            $table->string('name', 100);
            $table->string('type', 20);
            $table->string('state', 20);
            $table->string('address', 42)->nullable();
            $table->timestamps();

            $table->foreign('wallet_id'
            )->references('id')->on('wallets')->onDelete('cascade');

            $table->foreign('token_id'
            )->references('id')->on('tokens')->onDelete('cascade');

            $table->foreign('product_id'
            )->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wallet_vouchers');
    }
}
