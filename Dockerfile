FROM node:lts-alpine

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli

RUN usermod -u 1000 postgres

USER node

WORKDIR /home/node/app

