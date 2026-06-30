# KigaliCraft – E-Commerce Application Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install backend dependencies
COPY backend/package.json backend/package-lock.json* ./backend/
WORKDIR /app/backend
RUN npm install --omit=dev

# Copy backend source code
COPY backend/ ./

# Copy frontend (served statically by Express)
COPY frontend/ ../frontend/

# Create data directory for the JSON database and seed it
RUN mkdir -p /app/backend/data && node seed.js

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

CMD ["node", "server.js"]
