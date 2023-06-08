<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('directory_id');
            $table->string('title');
            $table->mediumText('description');
            $table->boolean('important');
            $table->boolean('completed');
            $table->dateTime('create_date');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('directory_id')->references('id')->on('directories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
