# Use an official Node runtime as a parent image
FROM node:21

WORKDIR /usr/src/app
COPY microservices/calculate-cash-flow/package*.json ./
RUN npm install

# Bundle app source
COPY microservices/calculate-cash-flow/ .

# Build the TypeScript app
RUN npm run build

EXPOSE 5001

# Define the command to run the app
CMD [ "node", "dist/server.js" ]