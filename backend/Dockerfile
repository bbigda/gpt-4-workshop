# Dockerfile for Java Spring Boot Backend

# Use the official Gradle image as the base image
FROM gradle:7.4.0-jdk17 AS build

# Set the working directory
WORKDIR /app

# Copy the build.gradle and settings.gradle files to the working directory
COPY build.gradle settings.gradle ./

# Copy the source code
COPY src ./src

# Run Gradle to build the application
RUN gradle clean build --no-daemon

# Use the official OpenJDK 17 image as the runtime base image
FROM openjdk:17-slim

# Update package list and install redis-tools
RUN apt-get update && \
    apt-get install -y redis-tools && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Set the entrypoint for the container
ENTRYPOINT ["java", "-jar", "app.jar"]
