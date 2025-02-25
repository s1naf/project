# Use the official Node.js image as the base image
FROM node:22

# Set the working directory
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY package*.json ./


# Remove node_modules and package-lock.json if they exist
RUN rm -rf node_modules package-lock.json


# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Start the Angular application
CMD ["npm", "start"]