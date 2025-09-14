FROM node:18-alpine

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache \
    gcc \
    g++ \
    python3 \
    py3-pip \
    openjdk11 \
    docker \
    docker-cli

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3002

# Start judge service
CMD ["npm", "start"]