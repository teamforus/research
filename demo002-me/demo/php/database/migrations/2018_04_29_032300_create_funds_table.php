<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFundsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('funds', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sponsor_id')->unsigned();
            $table->string('state', 20);
            $table->integer('per_item_limit');
            $table->timestamps();

            $table->foreign('sponsor_id'
            )->references('id')->on('sponsors')->onDelete('cascade');
        });

        Schema::create('fund_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('fund_id')->unsigned();
            $table->string('locale', 3);
            $table->string('name', 255);
            $table->text('description');

            $table->unique(['fund_id', 'locale']);
            $table->foreign('fund_id'
            )->references('id')->on('funds')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fund_translations');
        Schema::dropIfExists('funds');
    }
}
