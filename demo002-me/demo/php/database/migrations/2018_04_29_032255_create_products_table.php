<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('provider_id')->unsigned();
            $table->integer('product_category_id')->unsigned();
            $table->integer('old_price')->unsigned();
            $table->integer('price')->unsigned();
            $table->integer('amount')->unsigned();
            $table->timestamps();

            $table->foreign('provider_id'
            )->references('id')->on('providers')->onDelete('cascade');

            $table->foreign('product_category_id'
            )->references('id')->on('product_categories')->onDelete('cascade');
        });

        Schema::create('product_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_id')->unsigned();
            $table->string('locale', 3);
            $table->string('name', 20);
            $table->text('description');

            $table->unique([
                'product_id', 'locale'
            ]);
            $table->foreign(
                'product_id'
            )->references('id')->on(
                'products'
            )->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_translations');
        Schema::dropIfExists('products');
    }
}
