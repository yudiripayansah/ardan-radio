<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->text('username')->unique();
            $table->text('email')->unique();
            $table->text('name');
            $table->text('phone')->nullable();
            $table->text('address')->nullable();
            $table->text('gender')->nullable();
            $table->text('image')->nullable();
            $table->text('password');
            $table->text('role');
            $table->softDeletes();
            $table->timestamps();
            // $table->timestamp('email_verified_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
