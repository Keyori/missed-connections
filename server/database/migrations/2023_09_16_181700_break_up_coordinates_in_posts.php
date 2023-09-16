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
            $table->dropColumn('coordinates');
            $table->double('latitude')->nullable();
            $table->double('longitude')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->point('coordinates')->nullable();
            $table->dropColumn('longitude');
            $table->dropColumn('latitude');
        });
    }
};
