# Use uma imagem base adequada
FROM node:lts-alpine

# Instale bash e outras dependências necessárias
RUN apk add --no-cache bash

# Instale o CLI do NestJS globalmente
RUN npm install -g @nestjs/cli

# Defina o usuário como 'node' (o padrão do contêiner node)
USER node

# Defina o diretório de trabalho
WORKDIR /home/node/app

# Copie os arquivos de dependência do projeto
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Compile o código TypeScript
RUN npm run build

# Defina o ponto de entrada do contêiner
ENTRYPOINT [".docker/entrypoint.sh"]
