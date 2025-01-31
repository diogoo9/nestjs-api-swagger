FROM node:12.16.1

WORKDIR /user/local/app

COPY package.json ./

RUN npm install 

COPY . .

COPY .env /user/local/app/

RUN npm i -g @nestjs/cli

RUN npm i --save @nestjs/core @nestjs/common rxjs reflect-metadata class-validator class-transformer

CMD npm run dev

EXPOSE 3000
