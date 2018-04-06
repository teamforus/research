<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIntentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('intents', function (Blueprint $table) {
            $table->increments('id');
            $table->string('token');
            $table->integer('user_id')->unsigned()->nullable();
            $table->string('state')->default('pending');
            $table->string('type');
            $table->timestamps();

            // foreign keys
            $table->foreign('user_id')->references('id')
            ->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('intents');
    }
}
