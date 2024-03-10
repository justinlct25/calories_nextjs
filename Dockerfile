# base image
FROM node:18-alpine

# Create and change to the app directory
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available)
# Copying this first prevents re-running npm instal lon every code change
COPY . .

# RUN npm install --omit=dev
RUN npm install

# Clean install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
# RUN npm ci --only=production

RUN npm run build

CMD ["npm", "start"]