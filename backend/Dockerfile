# Step 1: Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json into the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application code into the container
COPY . .

# Step 6: Expose the port your backend runs on (change if your server uses a different port)
EXPOSE 8000

# Step 7: Define the command to run your application
CMD ["node", "server.js"]