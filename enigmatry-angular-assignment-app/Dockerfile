# Stage 1: Build Angular App
FROM node:18 AS build
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app
RUN npm run build --prod

# Stage 2: Serve App with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
