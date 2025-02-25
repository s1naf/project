# Version of Node.js to use
FROM node:22

# Directory to store the image
WORKDIR /app/backend

# Install the dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]


