<?php

// Reactivación de la cuenta (contrato de API v1, POST /account/reactivation-request y /account/reactivate)
return [
    'sent' => 'Si existe una cuenta inactiva con ese correo, te enviamos un enlace para reactivarla.',
    'reactivated' => 'Reactivamos tu cuenta. Inicia sesión para continuar.',
    'token' => 'El enlace no es válido o ya venció. Pide uno nuevo.',

    'mail' => [
        'subject' => 'Reactiva tu cuenta',
        'greeting' => 'Hola, :name',
        'intro' => 'Recibimos una solicitud para reactivar tu cuenta. Toda tu información se conservó.',
        'action' => 'Reactivar cuenta',
        'expire' => 'El enlace vale :count minutos y se puede usar una sola vez.',
        'ignore' => 'Si no pediste reactivarla, ignora este correo: tu cuenta sigue inactiva.',
        'salutation' => 'El equipo de App Finanzas',
    ],
];
