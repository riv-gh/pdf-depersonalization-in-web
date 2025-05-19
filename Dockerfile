# Use the official Node.js image to build the application
FROM node:22-slim AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.jsong
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

# Set environment variable
ENV CUSTOM_TITLE=""
ENV CUSTOM_DESCRIPTION=""
ENV DEFAULT_LANG=en
ENV BRUSH_COLOR=#FFFFFF
ENV BRUSH_SIZE=25
ENV SAVE_QUALITY=0.2


# Copy the built files from the build stage to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Add gettext for envsubst
RUN apk add --no-cache gettext

# Copy and configure entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 80
EXPOSE 80

# Use entrypoint script
ENTRYPOINT ["/entrypoint.sh"]

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
