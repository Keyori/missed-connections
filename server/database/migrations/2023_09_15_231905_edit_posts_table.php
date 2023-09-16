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
        Schema::table('posts', function (Blueprint $table) {
            $table->foreignId('user_id')->references('id')->on('users');
            $table->string('message');
            $table->dateTime('happened_at');
            $table->point('location')->nullable();
            $table->integer('campus')->nullable();
            $table->integer('likes')->default(1);
            $table->integer('dislikes')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropConstrainedForeignId('user_id');
            $table->dropColumn("message");
            $table->dropColumn("happened_at");
            $table->dropColumn('location');
            $table->dropColumn('campus');
            $table->dropColumn('likes')->default(1);
            $table->dropColumn('dislikes')->default(0);
        });
    }
};
