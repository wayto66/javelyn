#!/bin/bash

echo "Installing dependencies..."

# Navega para o diretório do aplicativo
mkdir /home/ec2-user/app
cd /home/ec2-user/app

# Instala dependências usando npm
npm install
