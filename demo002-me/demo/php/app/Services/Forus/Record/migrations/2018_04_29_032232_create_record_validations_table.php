<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecordValidationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('record_validations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('record_id')->unsigned();
            $table->integer('validator_id')->unsigned();
            $table->string('state', 20);
            $table->timestamps();

            $table->foreign('record_id'
            )->references('id')->on('records')->onDelete('cascade');

            $table->foreign('validator_id'
            )->references('id')->on('validators')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('record_validations');
    }
}
