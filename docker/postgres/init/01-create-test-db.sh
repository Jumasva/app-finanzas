#!/bin/bash
# Crea la base de las pruebas (phpunit.xml usa finanzas_test). Postgres solo ejecuta
# esta carpeta la primera vez, cuando el volumen pgdata está vacío
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE finanzas_test OWNER "$POSTGRES_USER";
EOSQL
