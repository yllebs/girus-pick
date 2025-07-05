# --- Build Stage ---
FROM node:alpine3.22 AS build
WORKDIR /app

# Copy only package.json first (for better layer caching)
COPY ./web/package.json ./
COPY ./web/copy-assets.sh ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY ./web/ .

RUN ls -la


# Run build scripts (fixed command chaining)
RUN npm run build

# --- Production Stage ---
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Override default Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]