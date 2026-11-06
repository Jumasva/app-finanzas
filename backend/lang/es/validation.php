<?php

// Mensajes de validación (RNF-MAN-001). Se agregan según los usen los Form Requests.
return [
    'confirmed' => 'La confirmación de :attribute no coincide.',
    'current_password' => 'La contraseña actual no es correcta.',
    'email' => 'Escribe un :attribute válido.',
    'in' => 'Elige una :attribute de la lista.',
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

    // Mensajes para un campo y una regla concretos
    'custom' => [
        'birth_date' => [
            'date_format' => 'Escribe una fecha de nacimiento válida.',
            'before_or_equal' => 'Debes tener al menos :age años para crear una cuenta.',
            'after_or_equal' => 'Escribe una fecha de nacimiento válida.',
        ],
        'currency_code' => [
            'required' => 'Elige tu moneda.',
        ],
        'password' => [
            'current_password' => 'La contraseña no es correcta.',
            'different' => 'Tu contraseña nueva debe ser distinta de la actual.',
        ],
    ],

    // Nombres de los campos tal como los ve el usuario
    'attributes' => [
        'name' => 'nombre',
        'birth_date' => 'fecha de nacimiento',
        'email' => 'correo',
        'password' => 'contraseña',
        'current_password' => 'contraseña actual',
        'currency_code' => 'moneda',
        'kind' => 'clase',
    ],
];
