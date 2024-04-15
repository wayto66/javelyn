# Use a imagem oficial do Node.js como imagem pai.
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o arquivo package.json e o package-lock.json (se disponível)
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia os arquivos e pastas restantes para o diretório de trabalho
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 4000

# Comando para rodar a aplicação
CMD ["nest", "start"]

aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin 686169939187.dkr.ecr.sa-east-1.amazonaws.com

docker tag javelyn:latest 686169939187.dkr.ecr.sa-east-1.amazonaws.com/javelyn

docker push 686169939187.dkr.ecr.sa-east-1.amazonaws.com/javelyn