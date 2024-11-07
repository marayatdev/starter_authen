# Stage 1: Build the TypeScript code
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Generate Prisma Client and build TypeScript code
RUN yarn prisma generate && yarn build

# Stage 2: Run the server with nodemon for development
FROM node:18

# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Install only production dependencies
RUN yarn install --production

# Install development dependencies, including nodemon for hot reloading
RUN yarn add nodemon

# Expose the application port (modify if different)
EXPOSE 4000

# Command to run the server with nodemon
CMD ["yarn", "nodemon", "--watch", "src", "--exec", "node", "dist/server.js"]
