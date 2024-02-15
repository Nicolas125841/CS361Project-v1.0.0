# Use an official Node runtime as a parent image
FROM node:21

WORKDIR /usr/src/app
COPY microservices/expense-rules-fetch/package*.json ./
RUN npm install

# Bundle app source
COPY microservices/expense-rules-fetch/ .

# Build the TypeScript app
RUN npm run build

EXPOSE 5002

# Define the command to run the app
CMD [ "node", "dist/server.js" ]
