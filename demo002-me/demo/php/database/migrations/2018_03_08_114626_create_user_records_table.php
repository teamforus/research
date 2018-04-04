<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_records', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('record_id')->unsigned();
            $table->string('value')->default('');
            $table->string('state')->default('pending');
            $table->timestamps();

            // foreign keys
            $table->foreign('user_id')->references('id')
            ->on('users')->onDelete('cascade');

            $table->foreign('record_id')->references('id')
            ->on('records')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_records');
    }
}
