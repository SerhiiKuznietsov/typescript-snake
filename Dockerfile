FROM node:20.12.0

WORKDIR /opt/app

ADD *.json .

RUN npm ci

ADD . .

EXPOSE 80

CMD [ "npm", "start" ]