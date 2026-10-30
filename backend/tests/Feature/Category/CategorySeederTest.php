<?php

use App\Models\Category;
use Database\Seeders\CategorySeeder;

it('crea las categorías iniciales del sistema y es idempotente', function () {
    $this->seed(CategorySeeder::class);
    $this->seed(CategorySeeder::class);

    expect(Category::whereNull('user_id')->count())->toBe(28)
        ->and(Category::whereNull('user_id')->where('kind', 'income')->count())->toBe(8)
        ->and(Category::whereNull('user_id')->where('kind', 'expense')->count())->toBe(15)
        ->and(Category::whereNull('user_id')->where('kind', 'obligation')->count())->toBe(5);
});

it('marca como reservadas solo las de los movimientos generados', function () {
    $this->seed(CategorySeeder::class);

    expect(Category::where('is_reserved', true)->orderBy('name')->pluck('name')->all())
        ->toBe(['Cobro de deuda', 'Pago de deuda', 'Pago de tarjeta']);
});
