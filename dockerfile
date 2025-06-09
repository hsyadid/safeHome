FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy source code
COPY . .

# Generate Prisma client if needed
# RUN npx prisma generate

EXPOSE 3000

# Use development mode
CMD ["pnpm", "run", "dev"]