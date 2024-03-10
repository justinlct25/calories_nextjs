# base image
FROM node:18-alpine

# environment variables
ARG POSTGRES_URL
ARG AUTH_GOOGLE_ID
ARG AUTH_GOOGLE_SECRET
ARG AUTH_SECRET
ENV POSTGRES_URL=$POSTGRES_URL \
    AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID \
    AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET \
    AUTH_SECRET=$AUTH_SECRET

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