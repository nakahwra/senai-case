FROM node:18.14.1-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]