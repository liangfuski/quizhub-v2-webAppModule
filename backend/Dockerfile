# Build Stage
FROM node:14-slim AS backend-build
WORKDIR /usr/src
COPY . ./backend/
RUN cd backend && npm install
ENV ENVIRONMENT=production
RUN cd backend && npm run build
RUN ls backend/dist  # Check if the build outputs are correct

# Production Stage
FROM node:14-slim
WORKDIR /root/
COPY --from=backend-build /usr/src/backend/dist .
RUN ls -l  # Verify that the files are copied correctly
EXPOSE 80

# Make sure 'api.bundle.js' is the correct entry point
CMD ["node", "api.bundle.js"]