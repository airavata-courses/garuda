# pull official base image
FROM node:14-alpine AS builder

# set working directory
WORKDIR /web_app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /web_app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . .

# start app
RUN npm install

ARG REACT_APP_API_GATEWAY_HOST
ARG REACT_APP_API_GATEWAY_PORT

ENV REACT_APP_API_GATEWAY_HOST $REACT_APP_API_GATEWAY_HOST
ENV REACT_APP_API_GATEWAY_PORT $REACT_APP_API_GATEWAY_PORT

RUN npm run build

# hosting

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /web_app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]