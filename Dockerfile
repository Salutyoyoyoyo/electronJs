FROM php:8.1-apache

# Configuration du ServerName d'Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN docker-php-ext-install pdo pdo_mysql

RUN pecl install apcu && \
    docker-php-ext-enable apcu

# Définition du répertoire de travail
WORKDIR /var/www/