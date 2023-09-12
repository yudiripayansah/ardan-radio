<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePenyiarTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('penyiar', function (Blueprint $table) {
            $table->id();
            $table->text('image');
            $table->text('name')->nullable();
            $table->text('text')->nullable();
            $table->text('instagram')->nullable();
            $table->text('twitter')->nullable();
            $table->softDeletes();
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
        Schema::dropIfExists('penyiar');
    }
}
