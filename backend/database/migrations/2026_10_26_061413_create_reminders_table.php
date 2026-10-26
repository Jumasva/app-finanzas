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
        Schema::create('reminders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->restrictOnDelete();
            $table->string('name', 100);
            $table->string('movement_type', 20)->nullable();
            $table->string('frequency', 20);
            $table->date('start_date')->default(DB::raw('CURRENT_DATE'));
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['user_id', 'is_active'], 'reminders_user_active_index');
        });

        DB::statement("ALTER TABLE reminders ADD CONSTRAINT reminders_movement_type_check CHECK (movement_type IS NULL OR movement_type IN ('income', 'expense'))");
        DB::statement("ALTER TABLE reminders ADD CONSTRAINT reminders_frequency_check CHECK (frequency IN ('daily', 'weekly', 'biweekly', 'monthly'))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reminders');
    }
};
