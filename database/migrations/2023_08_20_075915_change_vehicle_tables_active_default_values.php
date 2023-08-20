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
        Schema::table('vehicle_makes', function (Blueprint $table) {
            $table->boolean('active')->default(false)->change();
        });

        Schema::table('vehicle_models', function (Blueprint $table) {
            $table->boolean('active')->default(false)->change();
        });

        Schema::table('vehicle_engines', function (Blueprint $table) {
            $table->boolean('active')->default(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
