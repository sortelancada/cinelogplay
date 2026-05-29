FROM node:24-alpine

WORKDIR /app

RUN corepack enable && \
    corepack prepare pnpm@10.12.4 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/package.json

RUN pnpm install --frozen-lockfile

COPY backend ./backend

WORKDIR /app/backend

EXPOSE 3001

CMD ["pnpm", "dev"]
