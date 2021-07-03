FROM node:14-alpine as BASE

WORKDIR /src
COPY package.json package-lock.json /src/
COPY *.js /src/
EXPOSE 8080

FROM BASE as PROD

ENV NODE_ENV=production
RUN npm install --production
CMD ["node", "server.js"]