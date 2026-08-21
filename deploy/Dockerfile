# The site is a static export, so nothing JavaScript survives into the image:
# node builds it, nginx serves the files, and production has no runtime to
# patch, no server to fall over and nothing listening but a file server.
#
# Built from the repository root, not from this folder:
#   docker build -f deploy/Dockerfile .

# -- Stage 1: dependencies --
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# -- Stage 2: build --
FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# -- Stage 3: serve --
FROM nginx:alpine AS runner
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/security-headers.conf /etc/nginx/security-headers.conf

# The base image ships its own index.html and 50x.html here. Copying over
# them leaves the second one behind, served at /50x.html, which is nginx's
# default error page wearing this site's domain.
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/out /usr/share/nginx/html

# 3000 to match the other services behind the same proxy, and because a port
# above 1024 is one fewer reason for anything here to want privileges.
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q --spider http://127.0.0.1:3000/ || exit 1
