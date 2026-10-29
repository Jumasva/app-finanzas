<?php

// Valores de negocio configurables (RNF-MAN-008, reglas de negocio v1 «Valores configurables»).
// Por ahora solo las monedas; el resto de claves se agrega en el paso 2 (base común).
return [

    // Moneda al crear la cuenta
    'default_currency' => 'COP',

    // Monedas disponibles, con códigos ISO 4217 (RNF-PRE-001). Sus nombres están en lang/es/currencies.php
    'currencies' => ['COP', 'USD', 'EUR'],

];
