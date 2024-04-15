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
