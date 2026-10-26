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
        Schema::create('credit_card_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('credit_card_id')->constrained()->restrictOnDelete();
            $table->foreignId('financial_movement_id')->constrained()->restrictOnDelete();
            $table->decimal('amount', 15, 2);
            $table->date('payment_date')->default(DB::raw('CURRENT_DATE'));
            $table->string('payment_kind', 20)->nullable();
            $table->string('description', 255)->nullable();
            $table->string('status', 20)->default('active');
            $table->timestamp('voided_at')->nullable();
            $table->timestamps();

            $table->unique('financial_movement_id', 'credit_card_payments_movement_unique');
            $table->index(['credit_card_id', 'payment_date'], 'credit_card_payments_card_date_index');
        });

        DB::statement('ALTER TABLE credit_card_payments ADD CONSTRAINT amount_positive CHECK (amount > 0)');
        DB::statement("ALTER TABLE credit_card_payments ADD CONSTRAINT credit_card_payments_payment_kind_check CHECK (payment_kind IS NULL OR payment_kind IN ('full', 'partial'))");
        DB::statement("ALTER TABLE credit_card_payments ADD CONSTRAINT credit_card_payments_status_check CHECK (status IN ('active', 'voided'))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_card_payments');
    }
};
