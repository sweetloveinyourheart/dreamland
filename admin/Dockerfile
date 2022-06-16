FROM node:16-alpine

ENV NODE_ENV development

WORKDIR /manager

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "server.js"]