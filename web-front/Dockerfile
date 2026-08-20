FROM node:20-alpine AS build

WORKDIR /app

ARG VITE_API_URL=http://localhost:3100/api
ARG VITE_SOCKET_URL=http://localhost:3100
ARG VITE_OMDB_API_KEY=
ARG VITE_GIPHY_API_KEY=
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL
ENV VITE_OMDB_API_KEY=$VITE_OMDB_API_KEY
ENV VITE_GIPHY_API_KEY=$VITE_GIPHY_API_KEY

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
