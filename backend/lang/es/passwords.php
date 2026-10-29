<?php

// Recuperación de contraseña (contrato de API v1, POST /auth/forgot-password y /auth/reset-password)
return [
    'sent' => 'Si existe una cuenta activa con ese correo, te enviamos un enlace.',
    'reset' => 'Actualizamos tu contraseña. Inicia sesión con la nueva.',
    'token' => 'El enlace no es válido o ya venció. Pide uno nuevo.',

    'mail' => [
        'subject' => 'Restablece tu contraseña',
        'greeting' => 'Hola, :name',
        'intro' => 'Recibimos una solicitud para restablecer la contraseña de tu cuenta.',
        'action' => 'Restablecer contraseña',
        'expire' => 'El enlace vale :count minutos y se puede usar una sola vez.',
        'ignore' => 'Si no pediste este cambio, ignora este correo: tu contraseña sigue igual.',
        'salutation' => 'El equipo de App Finanzas',
    ],
];
