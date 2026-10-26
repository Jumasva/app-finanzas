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
        Schema::create('obligations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->restrictOnDelete();
            $table->foreignId('counterparty_id')->constrained()->restrictOnDelete();
            $table->foreignId('category_id')->constrained()->restrictOnDelete();
            $table->string('type', 20);
            $table->string('concept', 150);
            $table->string('description', 255)->nullable();
            $table->decimal('original_amount', 15, 2);
            $table->date('origin_date');
            $table->date('due_date')->nullable();
            $table->string('status', 20)->default('active');
            $table->timestamp('voided_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'type', 'due_date'], 'obligations_user_type_due_index');
        });

        DB::statement("ALTER TABLE obligations ADD CONSTRAINT obligations_type_check CHECK (type IN ('payable', 'receivable'))");
        DB::statement('ALTER TABLE obligations ADD CONSTRAINT original_amount_positive CHECK (original_amount > 0)');
        DB::statement('ALTER TABLE obligations ADD CONSTRAINT due_after_origin CHECK (due_date IS NULL OR due_date >= origin_date)');
        DB::statement("ALTER TABLE obligations ADD CONSTRAINT obligations_status_check CHECK (status IN ('active', 'voided'))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('obligations');
    }
};
