<?php

use App\Models\User;
use Illuminate\Support\Facades\DB;

it('borra los tokens vencidos y las sesiones expiradas, y conserva los vigentes', function () {
    $user = User::factory()->create();
    $old = now()->subMinutes(61);

    foreach (['password_reset_tokens', 'account_reactivation_tokens'] as $table) {
        DB::table($table)->insert([
            ['email' => 'vencido@correo.com', 'token' => 'hash', 'created_at' => $old],
            ['email' => 'vigente@correo.com', 'token' => 'hash', 'created_at' => now()],
        ]);
    }

    DB::table('sessions')->insert([
        ['id' => 'expirada', 'user_id' => $user->id, 'payload' => '', 'last_activity' => now()->subMinutes(31)->getTimestamp()],
        ['id' => 'vigente', 'user_id' => $user->id, 'payload' => '', 'last_activity' => now()->getTimestamp()],
    ]);

    $this->artisan('auth:prune-expired')->assertSuccessful();

    foreach (['password_reset_tokens', 'account_reactivation_tokens'] as $table) {
        $this->assertDatabaseMissing($table, ['email' => 'vencido@correo.com']);
        $this->assertDatabaseHas($table, ['email' => 'vigente@correo.com']);
    }

    $this->assertDatabaseMissing('sessions', ['id' => 'expirada']);
    $this->assertDatabaseHas('sessions', ['id' => 'vigente']);
});
