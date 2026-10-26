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
        Schema::create('savings_contributions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('savings_goal_id')->constrained()->restrictOnDelete();
            $table->decimal('amount', 15, 2);
            $table->date('contribution_date')->default(DB::raw('CURRENT_DATE'));
            $table->string('description', 255)->nullable();
            $table->string('status', 20)->default('active');
            $table->timestamp('voided_at')->nullable();
            $table->timestamps();

            $table->index(['savings_goal_id', 'contribution_date'], 'savings_contributions_goal_date_index');
        });

        DB::statement('ALTER TABLE savings_contributions ADD CONSTRAINT amount_positive CHECK (amount > 0)');
        DB::statement("ALTER TABLE savings_contributions ADD CONSTRAINT savings_contributions_status_check CHECK (status IN ('active', 'voided'))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('savings_contributions');
    }
};
