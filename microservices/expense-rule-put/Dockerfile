# Use an official Node runtime as a parent image
FROM node:21

WORKDIR /usr/src/app

# NOTE: I CHANGED THIS FROM FETCH TO PUT
COPY microservices/expense-rule-put/package*.json ./

RUN npm install

# Bundle app source
# NOTE: I CHANGED THIS FROM FETCH TO PUT
COPY microservices/expense-rule-put/ .

# Build the TypeScript app
RUN npm run build

EXPOSE 5004

# Define the command to run the app
CMD [ "node", "dist/server.js" ]
