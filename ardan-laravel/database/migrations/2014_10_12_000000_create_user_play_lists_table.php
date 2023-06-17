<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserplaylistsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('userplaylists', function (Blueprint $table) {
            $table->id();
            $table->text('title');
            $table->text('text')->nullable();
            $table->integer('id_user');
            $table->integer('id_parent');
            $table->integer('id_target');
            $table->text('target_type');
            $table->text('type');
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
        Schema::dropIfExists('userplaylists');
    }
}
