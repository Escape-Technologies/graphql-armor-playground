# Use the official Node.js image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the ports for the applications
EXPOSE 4000

CMD ["sh", "-c", "node proxy.js & node index.js & node index-protected.js & wait"]