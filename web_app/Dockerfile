# pull official base image
FROM node:14-alpine as build-server

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
# CMD ["npm", "start"]

RUN npm run build

# Choose nginx as build
FROM nginx:1.17.1-alpine

WORKDIR /usr/share/nginx 
RUN chmod -R 777 /var/log/nginx/ /var/cache/nginx/ /etc/nginx/ /var/run/
RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/conf.d/default.conf

COPY --from=build-server /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf 
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]