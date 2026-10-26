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
        Schema::create('financial_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->restrictOnDelete();
            $table->foreignId('category_id')->constrained()->restrictOnDelete();
            $table->string('type', 20);
            $table->string('payment_method', 20)->default('cash');
            $table->foreignId('credit_card_id')->nullable()->constrained()->restrictOnDelete();
            $table->smallInteger('installments')->nullable();
            $table->string('source', 20)->default('manual');
            $table->decimal('amount', 15, 2);
            $table->string('description', 255)->nullable();
            $table->date('movement_date')->default(DB::raw('CURRENT_DATE'));
            $table->string('status', 20)->default('active');
            $table->timestamp('voided_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'movement_date'], 'financial_movements_user_date_index');
            $table->index(['credit_card_id', 'movement_date'], 'financial_movements_card_date_index');
            $table->index(['user_id', 'category_id'], 'financial_movements_user_category_index');
        });

        DB::statement("ALTER TABLE financial_movements ADD CONSTRAINT financial_movements_type_check CHECK (type IN ('income', 'expense'))");
        DB::statement("ALTER TABLE financial_movements ADD CONSTRAINT financial_movements_payment_method_check CHECK (payment_method IN ('cash', 'debit', 'credit_card'))");
        DB::statement("ALTER TABLE financial_movements ADD CONSTRAINT financial_movements_source_check CHECK (source IN ('manual', 'obligation_payment', 'credit_card_payment'))");
        DB::statement('ALTER TABLE financial_movements ADD CONSTRAINT amount_positive CHECK (amount > 0)');
        DB::statement("ALTER TABLE financial_movements ADD CONSTRAINT financial_movements_status_check CHECK (status IN ('active', 'voided'))");
        // Con tarjeta: exige tarjeta y cuotas >= 1; sin tarjeta: ambas vacías
        DB::statement("ALTER TABLE financial_movements ADD CONSTRAINT credit_card_consistency CHECK ((payment_method = 'credit_card' AND credit_card_id IS NOT NULL AND installments IS NOT NULL AND installments >= 1) OR (payment_method <> 'credit_card' AND credit_card_id IS NULL AND installments IS NULL))");
        // La tarjeta solo se permite en gastos registrados manualmente
        DB::statement("ALTER TABLE financial_movements ADD CONSTRAINT credit_card_only_manual_expense CHECK (payment_method <> 'credit_card' OR (type = 'expense' AND source = 'manual'))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financial_movements');
    }
};
