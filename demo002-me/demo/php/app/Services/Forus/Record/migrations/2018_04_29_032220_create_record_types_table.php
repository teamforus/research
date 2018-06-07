<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecordTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('record_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('key');
            $table->timestamps();
        });

        Schema::create('record_type_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('record_type_id')->unsigned();
            $table->string('locale', 3);
            $table->string('name', 20);

            $table->unique(['record_type_id', 'locale']);
            $table->foreign('record_type_id'
            )->references('id')->on('record_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('record_type_translations');
        Schema::dropIfExists('record_types');
    }
}
