# Use the official Node.js image to build the application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY ./src ./src
COPY webpack.config.js ./

# Build the application
RUN npm run build

# Use the official Nginx image to serve the application
FROM nginx:alpine

# Copy the built files from the build stage to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
