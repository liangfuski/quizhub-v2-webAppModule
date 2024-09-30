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