<?php

namespace App\Models;

use Database\Factories\CategoryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

/**
 * Categoría de ingresos, egresos u obligaciones. Sin dueño (user_id vacío) es del sistema (RN-CAT-002).
 */
#[Fillable(['name', 'kind'])]
class Category extends Model
{
    /** @use HasFactory<CategoryFactory> */
    use HasFactory;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'is_reserved' => 'boolean',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isSystem(): bool
    {
        return $this->user_id === null;
    }

    /**
     * Ya la usa algún movimiento u obligación, contando los anulados (RN-CAT-005).
     */
    public function isInUse(): bool
    {
        return DB::table('financial_movements')->where('category_id', $this->id)->exists()
            || DB::table('obligations')->where('category_id', $this->id)->exists();
    }

    /**
     * Las del sistema y las del usuario; nunca las de otros usuarios (RN-CAT-007).
     *
     * @param  Builder<Category>  $query
     */
    public function scopeVisibleTo(Builder $query, User $user): void
    {
        $query->where(fn (Builder $query) => $query->whereNull('user_id')->orWhere('user_id', $user->id));
    }

    /**
     * Una categoría de otro usuario responde 404, igual que una que no existe (RNF-SEG-016).
     */
    public function resolveRouteBinding($value, $field = null): ?Model
    {
        return static::visibleTo(request()->user())->where($field ?? 'id', $value)->firstOrFail();
    }
}
