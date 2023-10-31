FROM node:18

WORKDIR /routes
COPY package*.json server.js ./ 
RUN npm install
COPY . .
EXPOSE 4000
CMD npm start