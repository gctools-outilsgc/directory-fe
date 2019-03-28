FROM nginx:alpine

WORKDIR /app

RUN apk update && apk upgrade && apk add git python yarn nodejs-npm
COPY . .
RUN yarn install && \
yarn build && \
cp -R /app/build /usr/share/nginx/html && \
rm -frv /app

COPY ./docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
