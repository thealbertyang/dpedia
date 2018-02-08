<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->increments('id');
            $table->string('icon_img')->nullable();
            $table->string('url')->nullable();
            $table->longText('body')->nullable();
            $table->string('ios_url')->nullable();
            $table->string('google_url')->nullable();
            $table->decimal('ios_rating', 2, 1)->nullable();
            $table->decimal('google_rating', 2, 1)->nullable();
            $table->boolean('sponsored')->nullable();
            $table->integer('reviews_category_id')->nullable();
            $table->string('pages')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reviews');
    }
}
