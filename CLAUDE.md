# App Finanzas

Sistema de información de finanzas personales. Es **únicamente una aplicación web** que se usa desde el navegador: no hay app móvil nativa ni app de escritorio (RNF-COM-002). Los tamaños "móvil", "tablet" y "desktop" de la guía de diseño son anchos de la ventana del navegador.

## Documentación (Google Drive, carpeta PROYECTO APP FINANZAS)

Cada sesión empieza leyendo la **GUÍA PARA DESARROLLO v1**: dice qué documento manda en cada tema, las reglas que no se pueden romper, la definición de terminado de un endpoint y el orden de construcción. El **CONTRATO DE API v1** se sigue al pie de la letra. Si algo no está definido o hay una contradicción, se pregunta antes de decidir.

## Entorno

Todo corre en Docker Compose (app, nginx, postgres, frontend, mailpit). PHP, Composer y Node **no se instalan en Windows ni en Ubuntu**: se ejecutan dentro de los contenedores.

| Para… | Comando |
| --- | --- |
| Artisan | `docker compose exec app php artisan …` |
| Composer | `docker compose exec app composer …` |
| Pruebas del backend | `docker compose exec app php artisan test` |
| Estilo del backend | `docker compose exec app vendor/bin/pint` |
| npm | `docker compose exec frontend npm …` |

- API: http://localhost:8000/api/v1 · Frontend: http://localhost:3000 · Mailpit: http://localhost:8025
- Postgres se expone en el puerto 5433 del equipo; dentro de Docker el host es `postgres`. Las pruebas usan la base `finanzas_test`.

## Flujo de trabajo

Una rama por funcionalidad, commits convencionales en español (`feat:`, `fix:`, `test:`, `docs:`, `chore:`) y Pull Request a `main`. GitHub Actions corre Pint, Pest y `composer audit`.

Instrucciones específicas: `backend/AGENTS.md` y `frontend/AGENTS.md`.
