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
        Schema::create('vehicle_makes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('active')->default(1);
        });

        Schema::create('vehicle_models', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('alias');
            $table->string('group_name')->nullable();
            $table->string('constructed_from')->nullable();
            $table->string('constructed_to')->nullable();
            $table->unsignedBigInteger('maker_id');
            $table->boolean('active')->default(1);
        });

        Schema::create('vehicle_engines', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('alias')->nullable();
            $table->string('fuel_type')->nullable();
            $table->unsignedBigInteger('model_id');
            $table->boolean('active')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_makes');
        Schema::dropIfExists('vehicle_models');
        Schema::dropIfExists('vehicle_engines');
    }
};
