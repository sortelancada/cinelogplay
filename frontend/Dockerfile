FROM node:24-alpine

WORKDIR /app

RUN corepack enable && \
    corepack prepare pnpm@10.12.4 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/package.json

RUN pnpm install --frozen-lockfile

COPY frontend ./frontend

WORKDIR /app/frontend

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--", "--host"]
