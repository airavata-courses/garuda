FROM node:14-alpine 


WORKDIR /db_middleware


COPY package.json .
RUN npm install
COPY . .
CMD npm start
