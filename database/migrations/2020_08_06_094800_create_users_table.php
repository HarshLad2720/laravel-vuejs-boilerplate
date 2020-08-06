<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

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
            $table->increments('id')->index()->comment('AUTO_INCREMENT');
            $table->string('name',255)->nullable();
            $table->string('email',255)->nullable();
            $table->string('password',255)->nullable();
            $table->string('mobile_no',255)->nullable();
            $table->unsignedInteger('role_id')->index()->nullable();
            $table->string('profile_image',255)->nullable();
            $table->enum('gender',['0', '1'])->nullable()->index()->comment('0 - Female, 1 - Male');
            $table->date('dob')->nullable();
            $table->string('city',255)->nullable();
            $table->string('address',500)->nullable();
            $table->enum('status', ['0', '1'])->index()->comment('0 - Inactive, 1 - Active');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('remember_token',255)->nullable();
            $table->timestamps();
            $table->softDeletes();

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
