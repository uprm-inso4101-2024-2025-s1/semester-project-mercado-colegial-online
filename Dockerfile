# Start your image with a node base image
FROM node:18-alpine

# 
RUN npm install -g http-server

# The /app directory should act as the main application directory
WORKDIR /vue-project

# Copy the app package and package-lock.json file
COPY /vue-project/package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
COPY ./ ./
# COPY ./vue-project/public ./vue-project/public

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \
    && npm install -g serve \
    && npm run build \
    && rm -fr node_modules

# 
EXPOSE 3000

# Start the app using serve command
CMD [ "serve", "-s", "http-server", "dist", "build" ]