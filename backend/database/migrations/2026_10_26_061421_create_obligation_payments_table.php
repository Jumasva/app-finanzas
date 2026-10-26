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
        Schema::create('obligation_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('obligation_id')->constrained()->restrictOnDelete();
            $table->foreignId('financial_movement_id')->constrained()->restrictOnDelete();
            $table->decimal('amount', 15, 2);
            $table->date('payment_date')->default(DB::raw('CURRENT_DATE'));
            $table->string('description', 255)->nullable();
            $table->string('status', 20)->default('active');
            $table->timestamp('voided_at')->nullable();
            $table->timestamps();

            $table->unique('financial_movement_id', 'obligation_payments_movement_unique');
            $table->index(['obligation_id', 'payment_date'], 'obligation_payments_obligation_date_index');
        });

        DB::statement('ALTER TABLE obligation_payments ADD CONSTRAINT amount_positive CHECK (amount > 0)');
        DB::statement("ALTER TABLE obligation_payments ADD CONSTRAINT obligation_payments_status_check CHECK (status IN ('active', 'voided'))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('obligation_payments');
    }
};
