<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIntentMetaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('intent_metas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('intent_id')->unsigned();
            $table->string('key');
            $table->string('value');
            $table->timestamps();

            // foreign keys
            $table->foreign('intent_id')->references('id')
            ->on('intents')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('intent_metas');
    }
}
