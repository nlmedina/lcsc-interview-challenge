# Stage 1: Build the static website using Node.js
FROM node:22 AS build-stage

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the static files
RUN npm run build

# Stage 2: Serve the built files using nginx
FROM nginx:alpine AS production-stage

# Copy built files from the build-stage to nginx's default static file directory
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 to be accessible from the host
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
