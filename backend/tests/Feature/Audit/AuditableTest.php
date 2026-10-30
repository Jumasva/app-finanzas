<?php

use App\Models\AuditLog;
use App\Models\Concerns\Auditable;
use App\Models\User;
use Illuminate\Database\ClassMorphViolationException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// Modelo de prueba: las tablas auditadas reales llegan con los módulos 2, 3, 4 y 8
class AuditedRecord extends Model
{
    use Auditable;

    protected $table = 'audited_records';

    protected $guarded = [];
}

class RecordWithoutAlias extends Model
{
    use Auditable;

    protected $table = 'audited_records';

    protected $guarded = [];
}

beforeEach(function () {
    Schema::create('audited_records', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id');
        $table->string('description')->nullable();
        $table->decimal('amount', 15, 2);
        $table->string('status', 20)->default('active');
        $table->timestamps();
    });

    Relation::morphMap(['audited_record' => AuditedRecord::class]);

    $this->user = User::factory()->create();
});

it('registra la creación con los valores nuevos y el alias del morph map', function () {
    $record = AuditedRecord::create(['user_id' => $this->user->id, 'description' => 'Mercado', 'amount' => '120000.00']);

    $log = AuditLog::sole();

    expect($log->action)->toBe('created')
        ->and($log->user_id)->toBe($this->user->id)
        ->and($log->auditable_type)->toBe('audited_record')
        ->and($log->auditable_id)->toBe($record->id)
        ->and($log->old_values)->toBeNull()
        ->and($log->new_values)->toMatchArray(['description' => 'Mercado', 'amount' => '120000.00'])
        ->and($log->new_values)->not->toHaveKeys(['created_at', 'updated_at']);
});

it('registra solo los campos que cambiaron, con su valor anterior y el nuevo', function () {
    $record = AuditedRecord::create(['user_id' => $this->user->id, 'description' => 'Mercado', 'amount' => '120000.00']);

    $record->update(['amount' => '150000.00']);

    $log = AuditLog::where('action', 'updated')->sole();

    expect($log->old_values)->toBe(['amount' => '120000.00'])
        ->and($log->new_values)->toBe(['amount' => '150000.00']);
});

it('no registra nada cuando una modificación no cambia ningún campo', function () {
    $record = AuditedRecord::create(['user_id' => $this->user->id, 'amount' => '1000.00']);

    $record->update(['amount' => '1000.00']);

    expect(AuditLog::count())->toBe(1);
});

it('registra la anulación como voided', function () {
    $record = AuditedRecord::create(['user_id' => $this->user->id, 'amount' => '1000.00']);

    $record->update(['status' => 'voided']);

    expect(AuditLog::latest('id')->first()->action)->toBe('voided');
});

it('registra la eliminación con los valores anteriores', function () {
    $record = AuditedRecord::create(['user_id' => $this->user->id, 'description' => 'Meta', 'amount' => '1000.00']);

    $record->delete();

    $log = AuditLog::where('action', 'deleted')->sole();

    expect($log->old_values)->toMatchArray(['description' => 'Meta'])
        ->and($log->new_values)->toBeNull();
});

it('deshace la entrada del historial si la transacción falla', function () {
    try {
        DB::transaction(function () {
            AuditedRecord::create(['user_id' => $this->user->id, 'amount' => '1000.00']);

            throw new RuntimeException('falla después de guardar');
        });
    } catch (RuntimeException) {
        //
    }

    expect(AuditedRecord::count())->toBe(0)
        ->and(AuditLog::count())->toBe(0);
});

it('no deja modificar ni eliminar una entrada del historial', function () {
    AuditedRecord::create(['user_id' => $this->user->id, 'amount' => '1000.00']);
    $log = AuditLog::sole();

    expect(fn () => $log->update(['action' => 'updated']))->toThrow(LogicException::class)
        ->and(fn () => $log->delete())->toThrow(LogicException::class);
});

it('exige que el modelo auditado tenga alias en el morph map', function () {
    expect(fn () => RecordWithoutAlias::create(['user_id' => $this->user->id, 'amount' => '1000.00']))
        ->toThrow(ClassMorphViolationException::class);
});
