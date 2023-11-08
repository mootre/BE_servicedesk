FROM node:18-alpine

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package*.json ./ 
RUN npm ci
RUN npm install
COPY . .
CMD npm start