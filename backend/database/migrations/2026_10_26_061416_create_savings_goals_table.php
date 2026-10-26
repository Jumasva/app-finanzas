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
        Schema::create('savings_goals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->restrictOnDelete();
            $table->string('name', 100);
            $table->string('description', 255)->nullable();
            $table->decimal('target_amount', 15, 2);
            $table->date('start_date')->default(DB::raw('CURRENT_DATE'));
            $table->date('due_date');
            $table->timestamp('finalized_at')->nullable();
            $table->boolean('was_achieved')->nullable();
            $table->timestamps();
        });

        DB::statement('ALTER TABLE savings_goals ADD CONSTRAINT target_amount_positive CHECK (target_amount > 0)');
        DB::statement('ALTER TABLE savings_goals ADD CONSTRAINT due_after_start CHECK (due_date > start_date)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('savings_goals');
    }
};
