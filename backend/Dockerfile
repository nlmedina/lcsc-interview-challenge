# Use Node 22 as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files to the container for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files to the container (excluding items in .dockerignore)
COPY . .

# Build the TypeScript project
RUN npm run build:ts

# Expose the port that the app will run on
EXPOSE 3000

# Set the entry point for the container
ENTRYPOINT ["./node_modules/.bin/fastify", "start", "-l", "info", "dist/app.js"]
