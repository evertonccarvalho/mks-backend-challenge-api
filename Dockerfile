FROM node:lts-alpine

WORKDIR /home/node/app

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli

COPY . .

RUN npm install

RUN npm run build

USER node

CMD [ "npm", "run", "start:prod" ]
