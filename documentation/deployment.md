# Doctorizing the application

## Background

This application has a NextJS frontend and a NodeJS API backend server. The frontend has a number of server side components, prerendering static pages and fetching a number of APIs at build time. The frontend will also call the the backend server for subsequent data processes.

## Doctorizing strategy

The frontend and the backend server will be doctorized into separate images.

## Challenges

1. As the NextJS frontend called the backend server during build time, the frontend image-building process depends on the running backend container.

2. The frontend container has to establish network communication with backend container.

## Initial approach and the problems

To address the challenges, the following docker-compose.yml file defines the networking of the two docker containers:

```yaml
version: "3.8"
services:
  backend:
    build: ./backend
    environment:
      - NODE_ENV=production
    ports:
      - "3001:80"
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80/api/health"]
      interval: 10s
      timeout: 5s
      retries: 5

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile # Make sure to specify your Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_ROOT_PATH=http://backend:80/api # Pointing to backend
    depends_on:
      backend:
        condition: service_healthy # Wait for backend to pass healthcheck
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

And the following next.config.mjs file define the root path accessing the backend server

```javascript
// Next.js automatically sets NODE_ENV to "development" when
// running the next dev command, and "production" for next start and next build
/** @type {import('next').NextConfig} */

// 172.17.0.1 allowing the docker container to access to
// the host machine
const nextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_ROOT_PATH:
      process.env.NODE_ENV === "production"
        ? "http://backend:80/api"
        : "http://localhost:3001/api",
  },
};

export default nextConfig;
```

The docker-compose file is expected to fulfill two functions:

1. The "depend on" clause ensures the backend containers is running when the frontend image building process starts
2. The frontend image can call the backend server through the domain name "backend"

However, "depend on" clause only guarantee that the backend CONTAINER is created before the frontend CONTAINER. Therefore, during the frontend image building process, the backend container's availability is not ensured.

Also, the docker-compose.yml file is about the frontend CONTAINER can access the backend CONTAINER through the "backend" domain. When building the backend image, the network has not yet been set up.

## Actual Solution

The follwoing procedures ensure the backend CONTAINER is available and accessible to the frontend building process.

1. Building the backend image.
2. Running the backend container and exposing the right port to the hosting machine.
   - Suppose the backend is running at port 80 inside the docker container, it has to expose the 80 port and map to a host machine port, says, 3001. Subsequently, the host machine can access the container through http://localhost:3001
3. Building the frontend image with a domain pointing to the host machine so that the frontend image can access the backend container through the domain and the mapping port.
   - In the ubuntu environment, a running container or a container in an image building process can access to the host machine through 172.17.0.1. Therefore, in the example of point 2, http://172.17.0.1:3001 can access to the backend running container.

The following next.confi.mjs and build_and_run.sh can fulfill the procedures.

```javascript
// Next.js automatically sets NODE_ENV to "development" when
// running the next dev command, and "production" for next start and next build
/** @type {import('next').NextConfig} */

// 172.17.0.1 allowing the docker container to access to
// the host machine
const nextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_ROOT_PATH:
      process.env.NODE_ENV === "production"
        ? "http://172.17.0.1:3001/api"
        : "http://localhost:3001/api",
  },
};

export default nextConfig;
```

```bash
#!/bin/bash

# Navigate to the backend directory and build the backend image
cd backend
echo "Building backend image..."
docker build -t quiz-hub-express-backend .

# Run the backend container
echo "Running backend container..."
docker run -d -p 3001:80 quiz-hub-express-backend

# Navigate to the frontend directory and build the frontend image
cd ../frontend
echo "Building frontend image..."
docker build -t quiz-hub-nextjs-frontend .

# Run the frontend container
echo "Running frontend container..."
docker run -p 3000:3000 quiz-hub-nextjs-frontend

echo "Build and run completed!"
```
