FROM node:20-alpine3.17 as builder
WORKDIR /app
COPY . /app
# COPY ./package.json ./package-lock.json ./
RUN yarn install

COPY . .
RUN yarn build

# Step 2: Set up the production environment
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# COPY docker-entrypoint.sh /
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

# EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
