# Étape 1 : Build de l'application
FROM node:20-alpine AS builder

WORKDIR /app

# Installation de PNPM
RUN corepack enable && pnpm --version

# Copier package.json et pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Installation des dépendances
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copier le reste du projet
COPY . .

# Build de l'application
RUN pnpm build

# Étape 2 : Serveur avec Nginx
FROM nginx:alpine

# Supprimer les fichiers temporaires pour économiser de l'espace
RUN rm -rf /var/cache/apk/*

# Copier les fichiers construits depuis l'étape de build
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]