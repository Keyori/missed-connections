<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $admin = new User();
        $admin->name = 'admin';
        $admin->email = 'admin@admin.com';
        $admin->password = Hash::make('admin');
        $admin->gender = 0;
        $admin->graduation_year = 2024;
        $admin->is_admin = true;
        $admin->save();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $admin = User::where('is_admin', true)->delete();
    }
};
