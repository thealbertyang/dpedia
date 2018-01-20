<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->increments('id');
            //$table->string('title');
            //$table->string('slug');
            //$table->text('body')->nullable();
            //$table->string('header_img')->nullable();
            $table->text('body')->nullable();
            $table->string('pages')->nullable();
            //$table->integer('expert_id')->nullable();
            //$table->string('status');
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
        Schema::dropIfExists('articles');
    }
}
