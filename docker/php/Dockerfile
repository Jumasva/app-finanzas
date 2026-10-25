# Imagen oficial de PHP 8.4 con FPM (el proceso que ejecuta PHP para nginx)
FROM php:8.4-fpm

# Librerías del sistema y extensiones de PHP: PostgreSQL, zip, idiomas, decimales exactos
RUN apt-get update && apt-get install -y git unzip libpq-dev libzip-dev libicu-dev \
 && docker-php-ext-install pdo_pgsql pgsql zip intl bcmath opcache \
 && rm -rf /var/lib/apt/lists/*

# Composer: el gestor de paquetes de PHP (como npm, pero para PHP)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Usuario con el mismo ID que tu usuario de Ubuntu, para que los archivos creados sean tuyos
ARG UID=1000
ARG GID=1000
RUN groupadd -g ${GID} dev && useradd -u ${UID} -g dev -m dev
USER dev

WORKDIR /var/www/backend
