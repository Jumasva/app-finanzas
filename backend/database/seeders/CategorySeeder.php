<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

/**
 * Categorías del sistema (RN-CAT-002 y «Categorías iniciales» de las reglas de negocio).
 * Es idempotente: se puede ejecutar varias veces sin duplicar (RNF-MAN-003).
 */
class CategorySeeder extends Seeder
{
    /**
     * Clase => [nombre => reservada]. Las reservadas solo las usan los movimientos generados (RN-CAT-003).
     *
     * @var array<string, array<string, bool>>
     */
    private const CATEGORIES = [
        'income' => [
            'Salario' => false,
            'Ventas' => false,
            'Rendimientos e inversiones' => false,
            'Arriendos recibidos' => false,
            'Regalos' => false,
            'Otros ingresos' => false,
            'Cobro de deuda' => true,
        ],
        'expense' => [
            'Alimentación' => false,
            'Vivienda' => false,
            'Servicios públicos' => false,
            'Transporte' => false,
            'Salud' => false,
            'Educación' => false,
            'Entretenimiento' => false,
            'Ropa y cuidado personal' => false,
            'Hogar' => false,
            'Mascotas' => false,
            'Tecnología y suscripciones' => false,
            'Impuestos' => false,
            'Otros egresos' => false,
            'Pago de deuda' => true,
            'Pago de tarjeta' => true,
        ],
        'obligation' => [
            'Préstamo personal' => false,
            'Crédito' => false,
            'Servicio' => false,
            'Venta a crédito' => false,
            'Otro' => false,
        ],
    ];

    public function run(): void
    {
        foreach (self::CATEGORIES as $kind => $categories) {
            foreach ($categories as $name => $isReserved) {
                $category = Category::query()
                    ->whereNull('user_id')
                    ->where('kind', $kind)
                    ->where('name', $name)
                    ->firstOrNew();

                $category->forceFill([
                    'name' => $name,
                    'kind' => $kind,
                    'is_reserved' => $isReserved,
                    'is_active' => true,
                ])->save();
            }
        }
    }
}
