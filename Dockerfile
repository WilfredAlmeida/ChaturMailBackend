FROM node:16.4.2

RUN ln -sf /bin/bash /bin/sh

RUN apt-get update && apt-get upgrade -y

RUN mkdir -p email_generator_node

WORKDIR /email_generator_node

RUN npm install -g npm

COPY package.json .

RUN npm install

COPY . .

CMD node index.js