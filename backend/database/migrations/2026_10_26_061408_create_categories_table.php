<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            // user_id vacío = categoría del sistema
            $table->foreignId('user_id')->nullable()->constrained()->restrictOnDelete();
            $table->string('name', 50);
            $table->string('kind', 20);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_reserved')->default(false);
            $table->timestamps();

            // NULLS NOT DISTINCT: las categorías del sistema (user_id vacío) tampoco se repiten
            $table->unique(['user_id', 'kind', 'name'], 'categories_user_kind_name_unique')->nullsNotDistinct();
        });

        DB::statement("ALTER TABLE categories ADD CONSTRAINT categories_kind_check CHECK (kind IN ('income', 'expense', 'obligation'))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
