FROM node:22-alpine AS build

WORKDIR /app/frontend

COPY package*.json ./

#npm is super slow download packages
RUN npm install pnpm -g && pnpm install

COPY . .

RUN pnpm build
