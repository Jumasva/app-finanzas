# App Finanzas

Sistema de información de finanzas personales: ingresos y egresos, objetivos de ahorro, cartera (cuentas por pagar y por cobrar), tarjetas de crédito, historial e informes. Es una aplicación web que se usa desde el navegador; no mueve dinero ni se conecta con bancos.

| Capa | Tecnología |
| --- | --- |
| Frontend | Next.js 16, TypeScript y Tailwind CSS (Node.js 24) |
| API | Laravel 13 (PHP 8.4) con Sanctum por cookies de sesión |
| Base de datos | PostgreSQL 18 |
| Pruebas | Pest |
| Entorno | Docker Compose: app, nginx, postgres, frontend y mailpit |

## Requisitos

Docker Desktop con WSL2 (en Windows) y Git. PHP, Composer, Node.js y PostgreSQL **no** se instalan en el equipo: corren dentro de los contenedores. En Windows, clona el proyecto dentro de Ubuntu (`~/projects/...`), no en `C:\` ni en `/mnt/c/`.

## Levantar el proyecto desde cero

```bash
git clone git@github.com:Jumasva/app-finanzas.git
cd app-finanzas

# 1. Variables de entorno: pon la misma contraseña en DB_PASSWORD de los dos archivos
cp .env.example .env
cp backend/.env.example backend/.env

# 2. Dependencias del backend y del frontend
docker compose build
docker compose run --rm app composer install
docker compose run --rm frontend npm install

# 3. Encender todo y preparar la base de datos
docker compose up -d
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate
```

Si tu usuario de Ubuntu no tiene el id 1000 (`id -u`), cambia `UID` y `GID` en el `.env` de la raíz antes del paso 2.

| Servicio | Dirección |
| --- | --- |
| Frontend | http://localhost:3000 |
| API | http://localhost:8000/api/v1 (estado: `/api/v1/health`) |
| Correos de desarrollo (Mailpit) | http://localhost:8025 |
| PostgreSQL (DBeaver u otro cliente) | `localhost:5433`, base `finanzas` |

## Comandos del día a día

| Para… | Comando |
| --- | --- |
| Encender / apagar todo | `docker compose up -d` / `docker compose down` |
| Ver errores de un servicio | `docker compose logs -f app` |
| Aplicar migraciones | `docker compose exec app php artisan migrate` |
| Recrear la base desde cero | `docker compose exec app php artisan migrate:fresh` |
| Correr las pruebas del backend | `docker compose exec app php artisan test` |
| Corregir el estilo del backend | `docker compose exec app vendor/bin/pint` |
| Instalar un paquete del frontend | `docker compose exec frontend npm install <paquete>` |

Las pruebas usan la base `finanzas_test`, que Postgres crea solo la primera vez que arranca con un volumen vacío. Si tu volumen es anterior a ese script, créala una vez:

```bash
docker compose exec postgres psql -U finanzas -d finanzas -c "CREATE DATABASE finanzas_test"
```

## Flujo de trabajo

Una rama por funcionalidad, commits convencionales (`feat:`, `fix:`, `test:`, `docs:`, `chore:`) y Pull Request a `main`. En cada Pull Request, GitHub Actions corre Pint, las pruebas y `composer audit`; si algo falla, no se fusiona.

La documentación funcional y técnica (requerimientos, reglas de negocio, modelo de datos y contrato de API) vive en Google Drive. El punto de entrada es la **Guía para desarrollo v1**.
