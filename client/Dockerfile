# syntax=docker/dockerfile:1

FROM node:14-alpine
WORKDIR /client
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build