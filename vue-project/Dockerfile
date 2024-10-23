# Start with a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Build the Vue.js project
RUN npm run build

# Install 'serve' to serve the built files
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 5000

# Command to serve the app using 'serve'
CMD ["serve", "-s", "dist"]
