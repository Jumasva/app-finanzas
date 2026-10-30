<?php

// Verificación del correo (contrato de API v1, POST /auth/verify-email y /auth/verification-email)
return [
    'sent' => 'Si hay una cuenta pendiente de verificar con ese correo, te enviamos un enlace.',
    'verified' => 'Verificamos tu correo. Ya puedes iniciar sesión.',
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
