FROM node:18-alpine

RUN mkdir -p /sv
WORKDIR /sv
COPY package*.json ./ 
RUN npm install
COPY . .
CMD ["node","server.js"]