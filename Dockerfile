FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh file project
COPY . .

# Build project SvelteKit
RUN npm run build

# Jalankan migrasi database (db:push)
RUN npm run db:push

# Jalankan aplikasi dari hasil build
CMD ["node", "build"]