# Linux Alpine 3.17.x + Node.js 18.x
FROM node:18-alpine3.17

# Create our application directory: 
WORKDIR /app

# Copy only package.json and package-lock.json into /app:
COPY package*.json /app

# Restore node_modules:
RUN npm i

# Take current directory and copy it into /app inside the image:
COPY . /app

# ---------------------------------------
# Running the container:

# When container runs - which command should we use to run our app:
ENTRYPOINT npm start
