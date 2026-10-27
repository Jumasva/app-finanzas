# Backend · API en Laravel

Laravel 13, PHP 8.4, PostgreSQL 18, Sanctum por cookies de sesión (modo SPA) y pruebas con Pest. Todos los comandos se ejecutan dentro del contenedor `app` (`docker compose exec app …`). PHP y Composer no se instalan fuera de Docker, y Laravel Boost no se usa en este proyecto.

## Receta de cada endpoint (RNF-MAN-004)

migración → modelo → Form Request → Policy → clase de acción o servicio → controlador delgado → API Resource → pruebas con Pest. La lógica de negocio nunca va en el controlador.

## Convenciones

- Rutas bajo `/api/v1`, en inglés, plural y kebab-case. Campos JSON en snake_case.
- Código, tablas y columnas en inglés. Los textos que ve el usuario van en español en `lang/es` (`validation.php`, `errors.php`).
- Errores con el formato del contrato: 422 con `message` y `errors`; los demás con `message` y `code` (ver `bootstrap/app.php`).
- Dinero en DECIMAL(15,2); en JSON viaja como texto con dos decimales. Nunca punto flotante.
- Marcas de tiempo en UTC con `toIso8601ZuluString()`. «Hoy» se calcula en America/Bogota.
- Un registro de otro usuario responde 404. Estados y totales se calculan en cada consulta, no se guardan.
- Los registros financieros se anulan (`status = 'voided'`), no se borran.

## Antes de dar algo por terminado

- `php artisan test` pasa, con pruebas del caso correcto, 401, 422, 404 de otro usuario y cada 409 del contrato.
- `vendor/bin/pint --test` pasa.
