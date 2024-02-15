# Stage 1: Build the React application
FROM node:21 as build-stage

WORKDIR /app

COPY client/package*.json ./

RUN npm install

COPY client/ .

RUN npm run build

# Stage 2: Serve the application from Nginx
FROM nginx:alpine

COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port (default for Nginx is 80)
EXPOSE 80

# Start Nginx and keep it running
CMD ["nginx", "-g", "daemon off;"]
