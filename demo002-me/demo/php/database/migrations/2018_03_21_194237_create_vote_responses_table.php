<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVoteResponsesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vote_responses', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('identity_id')->unsigned();
            $table->integer('vote_id')->unsigned();
            $table->integer('vote_option_id')->unsigned();
            $table->timestamps();

            // foreign keys
            /*$table->foreign('identity_id')->references('id')
                ->on('identities')->onDelete('cascade');*/

            $table->foreign('vote_id')->references('id')
                ->on('votes')->onDelete('cascade');

            $table->foreign('vote_option_id')->references('id')
                ->on('vote_options')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vote_responses');
    }
}
