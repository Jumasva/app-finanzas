<?php

namespace App\Models\Concerns;

use App\Models\AuditLog;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Arr;

/**
 * Deja una entrada en audit_logs por cada creación, modificación, anulación o eliminación (RNF-DAT-004, RN-HIS-006).
 *
 * Se usa con una línea en el modelo (use Auditable;) y el modelo necesita su alias en el morph map
 * de AppServiceProvider (cambio C). La entrada se escribe en la misma transacción que el cambio
 * siempre que la acción envuelva la operación en DB::transaction (RN-GEN-007).
 */
trait Auditable
{
    public static function bootAuditable(): void
    {
        static::created(function (self $model) {
            $model->writeAuditLog('created', null, $model->auditableValues($model->getAttributes()));
        });

        static::updated(function (self $model) {
            // Solo los campos que cambiaron (RN-HIS-006)
            $changes = $model->auditableValues($model->getChanges());

            if ($changes === []) {
                return;
            }

            $old = Arr::only($model->getRawOriginal(), array_keys($changes));

            $model->writeAuditLog($model->auditAction($changes), $old, $changes);
        });

        static::deleted(function (self $model) {
            $model->writeAuditLog('deleted', $model->auditableValues($model->getAttributes()), null);
        });
    }

    /**
     * @return MorphMany<AuditLog, $this>
     */
    public function auditLogs(): MorphMany
    {
        return $this->morphMany(AuditLog::class, 'auditable');
    }

    /**
     * Acción de una modificación. Anular es pasar status a voided; un modelo puede agregar las suyas,
     * como finalized y reopened en los objetivos de ahorro.
     *
     * @param  array<string, mixed>  $changes
     */
    protected function auditAction(array $changes): string
    {
        return ($changes['status'] ?? null) === 'voided' ? 'voided' : 'updated';
    }

    /**
     * Dueño del registro. Un registro sin user_id (un aporte, un abono, un pago) lo toma de su padre.
     */
    protected function auditUserId(): int
    {
        return $this->user_id;
    }

    /**
     * Quita los campos ocultos y las marcas de tiempo, que no aportan al historial.
     *
     * @param  array<string, mixed>  $values
     * @return array<string, mixed>
     */
    protected function auditableValues(array $values): array
    {
        return Arr::except($values, [...$this->getHidden(), 'created_at', 'updated_at']);
    }

    /**
     * @param  array<string, mixed>|null  $old
     * @param  array<string, mixed>|null  $new
     */
    protected function writeAuditLog(string $action, ?array $old, ?array $new): void
    {
        AuditLog::create([
            'user_id' => $this->auditUserId(),
            'auditable_type' => $this->getMorphClass(),
            'auditable_id' => $this->getKey(),
            'action' => $action,
            'old_values' => $old,
            'new_values' => $new,
        ]);
    }
}
