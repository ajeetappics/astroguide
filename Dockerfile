# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# IMPORTANT: Receive the argument
ARG BUILD_ENV_FILE

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .

# IMPORTANT: Printf is better for multi-line secrets
RUN printf "%s" "$BUILD_ENV_FILE" > .env

# DEBUG: Check if file is actually created and has content
RUN ls -la .env && echo "File size: $(wc -c < .env) bytes"

# If size is too small, fail the build here
RUN if [ $(wc -c < .env) -le 10 ]; then echo "ERROR: .env file is empty or too small!" && exit 1; fi

RUN npm run build

# Stage 2: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts 

EXPOSE 3000
CMD ["npm", "start"]
