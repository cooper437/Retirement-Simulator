# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:fermium-alpine

# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /usr/src/app

RUN yarn set version berry

# Copies package.json and package-lock.json to Docker environment
COPY ./package*.json ./yarn.lock .yarn ./
RUN yarn install
COPY . .

# Uses port which is used by the actual application
EXPOSE 3000

# Build the application
RUN npm run build
RUN npm install -g serve


# Finally runs the application
CMD [ "serve", "-s", "build", "-l", "3000" ]