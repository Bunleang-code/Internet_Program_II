# Use Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files to install deps
COPY package*.json ./

# Install all dependencies (dev + prod)
RUN npm install

# Mount your code via Docker Compose, so no need to copy

# Expose port
EXPOSE 3000

# Run NestJS in watch mode
CMD ["npm", "run", "start:dev"]