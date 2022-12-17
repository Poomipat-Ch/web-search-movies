FROM node:16-alpine as builder

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD [ "sh", "-c", "yarn start:prod"]