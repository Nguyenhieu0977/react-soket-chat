# syntax=docker/dockerfile:1

FROM node:15.13-alpine
WORKDIR /client
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build