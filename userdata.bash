#!/bin/bash
# Navega para o diretório do projeto
cd /home/ec2-user/javelyn

# Instala Node.js e npm se não estiverem instalados
curl -sL https://rpm.nodesource.com/setup_14.x | bash -
yum install -y nodejs

# Instala PM2 para gerenciar a aplicação
npm install pm2 -g

# Instala as dependências do projeto
npm install

# Define a variável de ambiente para a conexão do banco de dados
export DATABASE_URL="postgresql://postgres:videoboy66@javelyn-lite-db.cj0yq6yr0kqf.sa-east-1.rds.amazonaws.com:5432/javelyn-lite-db?schema=public" 

# Inicia a aplicação usando PM2
pm2 start npm --name "javelyn" -- run start

# Configura o PM2 para reiniciar automaticamente após reboots
pm2 save
pm2 startup
