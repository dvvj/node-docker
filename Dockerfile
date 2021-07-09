FROM node:14-alpine as BASE

WORKDIR /src
COPY package.json package-lock.json /src/
COPY db /src/db
COPY *.js /src/
EXPOSE 8080

FROM BASE as PROD

ENV NODE_ENV=production
RUN npm install --production

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

CMD /wait && node server.js