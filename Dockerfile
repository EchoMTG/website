FROM node:14 as dev

WORKDIR /usr/src/app

COPY . ./
RUN npm install

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080
ARG NUXT_ENV_API_DOMAIN
ENV NUXT_ENV_API_DOMAIN=$NUXT_ENV_API_DOMAIN

RUN npm run build

CMD [ "npm", "start" ]
