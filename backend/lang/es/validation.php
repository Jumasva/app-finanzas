<?php

// Mensajes de validación (RNF-MAN-001). Se agregan según los usen los Form Requests.
return [
    'confirmed' => 'La confirmación de :attribute no coincide.',
    'email' => 'Escribe un :attribute válido.',
    'max' => [
        'string' => ':Attribute no puede tener más de :max caracteres.',
    ],
    'min' => [
        'string' => ':Attribute debe tener al menos :min caracteres.',
    ],
    'required' => 'Escribe tu :attribute.',
    'string' => ':Attribute debe ser un texto.',
    'unique' => 'Ya existe una cuenta con este :attribute.',

    'password' => [
        'numbers' => 'Tu :attribute debe incluir al menos un número.',
        'symbols' => 'Tu :attribute debe incluir al menos un símbolo, por ejemplo ! # $ o un espacio.',
        'uncompromised' => 'Esta contraseña apareció en una filtración de datos. Elige otra.',
    ],

    // Nombres de los campos tal como los ve el usuario
    'attributes' => [
        'name' => 'nombre',
        'email' => 'correo',
        'password' => 'contraseña',
    ],
];
