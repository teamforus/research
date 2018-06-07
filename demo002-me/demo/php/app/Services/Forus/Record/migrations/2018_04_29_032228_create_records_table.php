<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('records', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('identity_id')->unsigned();
            $table->integer('record_type_id')->unsigned();
            $table->integer('record_category_id')->unsigned()->nullable();
            $table->string('value')->default('');
            $table->integer('order')->unsigned()->default(0);
            $table->timestamps();

            $table->foreign('identity_id'
            )->references('id')->on('identities')->onDelete('cascade');

            $table->foreign('record_type_id'
            )->references('id')->on('record_types')->onDelete('cascade');

            $table->foreign('record_category_id'
            )->references('id')->on('record_categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('records');
    }
}
