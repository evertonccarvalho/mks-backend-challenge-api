#!/bin/bash

# Aguarde até que o banco de dados esteja disponível
echo "Esperando pelo banco de dados..."

until nc -z -v -w30 db 5432
do
  echo "Aguardando banco de dados..."
  sleep 1
done

echo "Banco de dados está disponível."

# Instale as dependências do projeto
npm install

# Compile o código TypeScript
npm run build

# Execute as migrações
# npx typeorm migration:run -d dist/infra/config/typeorm/orm-cli-config.js

# Inicie a aplicação
npm run start:prod
