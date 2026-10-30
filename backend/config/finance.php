<?php

// Valores de negocio configurables (RNF-MAN-008, reglas de negocio v1 «Valores configurables», RN-CFG).
// Se cambian aquí, sin migraciones y sin buscarlos por el código.
return [

    // Zona horaria de «hoy»: fechas futuras, vencimientos, avisos y períodos (RN-GEN-001)
    'timezone' => 'America/Bogota',

    // Moneda al crear la cuenta
    'default_currency' => 'COP',

    // Monedas disponibles, con códigos ISO 4217 (RNF-PRE-001). Sus nombres están en lang/es/currencies.php
    'currencies' => ['COP', 'USD', 'EUR'],

    // Días de anticipación de los avisos (RN-ALE)
    'alerts' => [
        'obligation_days' => 7,
        'savings_goal_days' => 7,
        'credit_card_days' => 3,
    ],

    // Informes (RN-INF-001 y RN-INF-008)
    'reports' => [
        'upcoming_obligation_days' => 30,
        'max_custom_range_years' => 5,
    ],

    // Panel (RN-PAN-004 y RN-PAN-005)
    'dashboard' => [
        'recent_movements' => 5,
        'top_categories' => 5,
    ],

    // Máximo de cuotas de una compra con tarjeta (RN-MOV-006)
    'installments' => [
        'max' => 48,
    ],

    // Tamaño de página de los listados (RNF-REN-002)
    'pagination' => [
        'default' => 20,
        'max' => 100,
    ],

];
