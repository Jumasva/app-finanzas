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
        Schema::create('credit_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->restrictOnDelete();
            $table->string('name', 50);
            $table->string('issuer', 100)->nullable();
            $table->decimal('credit_limit', 15, 2);
            $table->smallInteger('statement_day');
            $table->smallInteger('payment_due_day');
            $table->boolean('alerts_enabled')->default(true);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        DB::statement('ALTER TABLE credit_cards ADD CONSTRAINT credit_limit_positive CHECK (credit_limit > 0)');
        // Días de corte y de pago dentro del rango de un mes
        DB::statement('ALTER TABLE credit_cards ADD CONSTRAINT valid_days CHECK (statement_day BETWEEN 1 AND 31 AND payment_due_day BETWEEN 1 AND 31)');
        // Único por usuario sin distinguir mayúsculas/minúsculas
        DB::statement('CREATE UNIQUE INDEX credit_cards_user_name_unique ON credit_cards (user_id, LOWER(name))');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_cards');
    }
};
