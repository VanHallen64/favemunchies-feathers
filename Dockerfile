# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy local code to the container image.
COPY . ./

WORKDIR /usr/src/app/frontend

# Install production dependencies.
RUN yarn install
RUN yarn build

WORKDIR /usr/src/app/backend


# Install production dependencies.
RUN npm install

# Run the web service on container startup.
CMD [ "npm", "start" ]