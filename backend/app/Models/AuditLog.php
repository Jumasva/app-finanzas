<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use LogicException;

/**
 * Entrada del historial de cambios (TRACA-024 a 027). Solo admite inserciones (RN-HIS-007).
 */
#[Fillable(['user_id', 'auditable_type', 'auditable_id', 'action', 'old_values', 'new_values'])]
class AuditLog extends Model
{
    // Solo created_at: una entrada nunca se modifica
    public const UPDATED_AT = null;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'old_values' => 'array',
            'new_values' => 'array',
        ];
    }

    protected static function booted(): void
    {
        static::updating(fn () => throw new LogicException('El historial de cambios no se modifica.'));
        static::deleting(fn () => throw new LogicException('El historial de cambios no se elimina.'));
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return MorphTo<Model, $this>
     */
    public function auditable(): MorphTo
    {
        return $this->morphTo();
    }
}
