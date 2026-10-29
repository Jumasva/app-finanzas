<?php

// Verificación del correo (contrato de API v1, POST /auth/verify-email y /auth/verification-email)
return [
    'sent' => 'Te enviamos un enlace para verificar tu correo.',
    'already_verified' => 'Tu correo ya está verificado.',
    'verified' => 'Verificamos tu correo. Ya puedes usar la aplicación.',
    'token' => 'El enlace no es válido o ya venció. Pide uno nuevo.',

    'mail' => [
        'subject' => 'Verifica tu correo',
        'greeting' => 'Hola, :name',
        'intro' => 'Para terminar de crear tu cuenta, confirma que este correo es tuyo.',
        'action' => 'Verificar correo',
        'expire' => 'El enlace vale :count horas y se puede usar una sola vez.',
        'ignore' => 'Si no creaste una cuenta en App Finanzas, ignora este correo.',
        'salutation' => 'El equipo de App Finanzas',
    ],
];
