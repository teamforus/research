<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVoteOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vote_options', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('order')->unsigned();
            $table->string('value', 200);
            $table->integer('vote_id')->unsigned();
            $table->timestamps();

            // foreign keys
            $table->foreign('vote_id')->references('id')
                ->on('votes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vote_options');
    }
}
