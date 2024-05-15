FROM node:lts-alpine

# Instale o Nest CLI globalmente
RUN npm install -g @nestjs/cli

# Crie um diretório de trabalho para o aplicativo
WORKDIR /home/node/app

# Copie apenas os arquivos relacionados ao gerenciamento de pacotes para aproveitar o cache do Docker
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install --production

# Copie o restante do código-fonte para o diretório de trabalho
COPY . .

# Exponha a porta 3000, que é a porta em que o aplicativo Nest.js será executado
EXPOSE 3000

# Defina o comando de entrada para iniciar o aplicativo
CMD ["npm", "run", "start:prod"]
