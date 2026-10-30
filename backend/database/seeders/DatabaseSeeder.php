<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Datos iniciales de todos los entornos: php artisan db:seed (RNF-MAN-003).
     */
    public function run(): void
    {
        $this->call(CategorySeeder::class);
    }
}
