# ==================================================================================
# DOCKERFILE PRODUCTION - OPTIMIZED NEXTJS BUILD
# ==================================================================================

# Base image untuk dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files dan install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm
# Install ALL dependencies (including dev deps for build)
RUN pnpm install --no-frozen-lockfile

# ==================================================================================
# BUILDER STAGE - Build aplikasi
# ==================================================================================
FROM node:18-alpine AS builder
WORKDIR /app

# Copy node_modules dari deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy semua source code
COPY . .

# Install pnpm
RUN npm install -g pnpm

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build aplikasi NextJS
RUN pnpm run build

# Debug: List build output untuk memastikan file ada
RUN echo "=== BUILD OUTPUT DEBUG ===" && \
    ls -la .next/ && \
    echo "=== STANDALONE CHECK ===" && \
    ls -la .next/standalone/ && \
    echo "=== STATIC CHECK ===" && \
    ls -la .next/static/

# ==================================================================================
# RUNNER STAGE - Production runtime
# ==================================================================================
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Buat user non-root untuk security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public folder
COPY --from=builder /app/public ./public

# Copy next.js build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch ke user non-root
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start aplikasi
CMD ["node", "server.js"] 