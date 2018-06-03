<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tokens', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('fund_id')->unsigned()->nullable();
            $table->string('key', 20);
            $table->string('address', 42)->nullable();
            $table->timestamps();

            $table->foreign('fund_id'
            )->references('id')->on('funds')->onDelete('cascade');
        });

        Schema::create('token_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('token_id')->unsigned();
            $table->string('locale', 3);
            $table->string('abbr', 10);
            $table->string('name', 20);

            $table->unique(['token_id', 'locale']);
            $table->foreign('token_id'
            )->references('id')->on('tokens')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('token_translations');
        Schema::dropIfExists('tokens');
    }
}
