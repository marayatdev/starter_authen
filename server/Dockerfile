FROM node:20 as build
WORKDIR /usr/src/app
COPY package.json . 
COPY yarn.lock . 
RUN yarn install 
COPY . . 
RUN yarn prisma generate
RUN yarn build

FROM node:20-slim
RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends

# Set environment variable directly in Dockerfile if needed
ENV NODE_ENV production


WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/.env .env
COPY --chown=node:node --from=build /usr/src/app/package.json .
COPY --chown=node:node --from=build /usr/src/app/yarn.lock .
RUN npm install --omit=dev
COPY --chown=node:node --from=build /usr/src/app/node_modules/.prisma/client  ./node_modules/.prisma/client

EXPOSE 8000
CMD ["dumb-init", "node", "dist/server.js"]
