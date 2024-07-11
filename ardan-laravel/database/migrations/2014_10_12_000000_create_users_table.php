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
            $table->text('username')->nullable();
            $table->text('email');
            $table->text('name');
            $table->text('phone')->nullable();
            $table->text('address')->nullable();
            $table->text('gender')->nullable();
            $table->text('image')->nullable();
            $table->text('password');
            $table->text('role');
            $table->text('penyiar')->nullable();
            $table->text('verified')->nullable();
            $table->text('dob')->nullable();
            $table->text('status')->nullable();
            $table->text('token')->nullable();
            $table->text('otp')->nullable();
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
