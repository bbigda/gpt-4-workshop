#!/bin/bash

# Create directories
mkdir -p project/backend project/frontend

# Create docker-compose.yml file
cat <<EOT > project/docker-compose.yml
version: "3.9"

services:
  postgres:
    image: postgres:13
    env_file:
      - db.env
    environment:
      POSTGRES_DB: your_database
    volumes:
      - db-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:6.2
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    env_file:
      - db.env
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/your_database
      SPRING_REDIS_HOST: redis
    depends_on:
      - postgres
      - redis

  frontend:
    build: ./frontend
    ports:
      - "4200:4200"
    depends_on:
      - backend

volumes:
  db-data:
EOT

# Create db.env file
cat <<EOT > project/db.env
POSTGRES_USER=mydbuser
POSTGRES_PASSWORD=mydbpassword
EOT

# Create backend Dockerfile
cat <<EOT > project/backend/Dockerfile
FROM openjdk:11-jdk-slim

ARG JAR_FILE=target/*.jar

COPY \${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
EOT

# Create frontend Dockerfile
cat <<EOT > project/frontend/Dockerfile
FROM node:14 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21

COPY --from=build-stage /app/dist/your-angular-app /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
EOT

# Create frontend nginx-custom.conf
cat <<EOT > project/frontend/nginx-custom.conf
server {
  listen 80;

  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files \$uri \$uri/ /index.html;
  }
}
EOT

echo "Directory structure created successfully."
