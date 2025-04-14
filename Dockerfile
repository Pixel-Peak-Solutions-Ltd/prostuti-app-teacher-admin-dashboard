# First stage: Build the React app
# Use the Node alpine official image
FROM node:20.9.0-alpine AS build

# Set config
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false

# Install build dependencies
RUN apk add --no-cache python3 make g++ git

# Create and change to the app directory.
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install packages
RUN npm ci || npm install

# Copy local code to the container image.
COPY . ./

# Build the app.
RUN npm run build

# Second stage: Serve with Caddy
FROM caddy:2.7.5-alpine

# Create and change to the app directory.
WORKDIR /app

# Copy Caddyfile to the container image.
COPY Caddyfile ./

# Format the Caddyfile
RUN caddy fmt Caddyfile --overwrite

# Copy build files from the first stage
COPY --from=build /app/dist ./dist

# Use Caddy to run/serve the app
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]