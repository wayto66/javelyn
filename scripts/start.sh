#!/bin/bash

echo "Starting the NestJS application..."

# Navega para o diretório do aplicativo
cd /home/ec2-user/app

# Inicia o aplicativo usando PM2
pm2 start dist/main.js --name nest-app --env production
