<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIdentityActiveTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('identity_active_types', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('identity_id')->unsigned();
            $table->integer('identity_type_id')->unsigned();
            $table->string('state');
            $table->timestamps();

            $table->foreign('identity_id'
            )->references('id')->on('identities')->onDelete('cascade');

            $table->foreign('identity_type_id'
            )->references('id')->on('identity_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('identity_active_types');
    }
}
