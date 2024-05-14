#!/bin/bash
# Navega para o diretório do projeto
screen
cd /home/ec2-user/javelyn

# Instala Node.js e npm se não estiverem instalados
curl -sL https://rpm.nodesource.com/setup_14.x | bash -
yum install -y nodejs

# Instala as dependências do projeto
npm install

# Define a variável de ambiente para a conexão do banco de dados
export DATABASE_URL="postgresql://postgres:videoboy66@javelyn-lite-db.cj0yq6yr0kqf.sa-east-1.rds.amazonaws.com:5432/javelyn-lite-db?schema=public" 

npm run start
