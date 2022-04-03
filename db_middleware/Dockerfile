FROM node:14-alpine 

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY

WORKDIR /db_middleware

RUN echo "export ${AWS_ACCESS_KEY_ID}"
RUN echo "export ${AWS_SECRET_ACCESS_KEY}"

COPY package.json .
RUN npm install
COPY . .
CMD npm start
