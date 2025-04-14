# First stage: Build the React app
# Use a full Node image (not Alpine) to avoid dependency issues
FROM node:20-slim AS build

# Set config
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false
ENV NODE_ENV=production

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Create and change to the app directory
WORKDIR /app

# Copy only the necessary files for npm install
COPY package.json ./

# Install production dependencies only, with fallbacks
RUN npm install --only=production --force || \
    npm install --production=false --force

# Copy local code to the container image
COPY . ./

# Build the app
RUN npm run build

# Second stage: Serve with Caddy
FROM caddy:2.7.5

# Create and change to the app directory
WORKDIR /app

# Copy Caddyfile to the container image
COPY Caddyfile ./

# Format the Caddyfile
RUN caddy fmt Caddyfile --overwrite

# Copy build files from the first stage
COPY --from=build /app/dist ./dist

# Use Caddy to run/serve the app
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]