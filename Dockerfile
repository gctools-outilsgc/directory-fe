FROM node:13

# Create app directory
WORKDIR /usr/src/app

RUN apt-get update && apt-get -y upgrade

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

# If you are building your code for production
# RUN npm install --only=production

COPY . .
RUN node --max-old-space-size=4096 scripts/build.js
RUN npm install -g serve
# Bundle app source

EXPOSE 3000

CMD [ "serve", "-s", "build", "-l", "3000" ]
