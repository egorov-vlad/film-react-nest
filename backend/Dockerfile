FROM node:22-alpine AS build

WORKDIR /temp/app/backend

COPY package*.json ./

RUN npm install pnpm -g && pnpm install 

COPY . .

RUN pnpm build

FROM node:22-alpine

WORKDIR /app/backend

COPY --from=build /temp/app/backend/package*.json ./

RUN npm install pnpm -g && pnpm install --prod

COPY --from=build /temp/app/backend/dist ./dist
COPY --from=build /temp/app/backend/public ./public

CMD ["node", "dist/main.js"]

EXPOSE 3000