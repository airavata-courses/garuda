FROM node:14

WORKDIR /db_middleware
COPY package.json .
RUN npm install
COPY . .
CMD npm start
