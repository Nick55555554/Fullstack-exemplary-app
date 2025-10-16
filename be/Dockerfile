FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package*json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE ${APP_PORT}

CMD ["pnpm", "start:dev"]