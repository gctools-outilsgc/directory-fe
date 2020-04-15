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

# Bundle app source

EXPOSE 3000

CMD [ "yarn", "start" ]
