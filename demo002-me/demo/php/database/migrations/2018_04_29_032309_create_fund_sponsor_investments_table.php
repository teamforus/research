<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFundSponsorInvestmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fund_sponsor_investments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('fund_sponsor_id')->unsigned();
            $table->integer('amount')->unsigned();
            $table->timestamps();

            $table->foreign('fund_sponsor_id'
            )->references('id')->on('fund_sponsors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fund_sponsor_investments');
    }
}
