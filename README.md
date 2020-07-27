# Directory Front End

This project is the front-end application for the [GCTools Directory](https://profile.gccollab.ca)

## Motivation

The front end app is a stand alone app and requires our [account](https://github.com/gctools-outilsgc/concierge) and [profile as a service](https://github.com/gctools-outilsgc/profile_service) apps in order to fully work. This is intended to work in our micro service architecture as shown here:

![Image of OADW Architecture Concept](https://documentation.beta.gccollab.ca/static/OADW_Architecture-Walkthrough-a6bf66bae45a89a68cadee688d31d43c-71e8e.png)

## Installation

You need [nodejs](https://nodejs.org/en/), [yarn](https://yarnpkg.com/) and ideally [docker-compose](https://docs.docker.com/compose/install/)

### Install for Dev
If you have an account and profile service spun up you can make the connections in `scripts/start.js`

```
# scripts/start.js

# your dev url
const BASE_URL = "http://localhost:3000";
# profile service endpoint
if (!process.env.REACT_APP_GQL_ENDPOINT)
  process.env.REACT_APP_GQL_ENDPOINT = 'https://paas.beta.gccollab.ca/';
# account service endpoint
if (!process.env.REACT_APP_OIDC_AUTHORITY)
  process.env.REACT_APP_OIDC_AUTHORITY = 'https://dev.account.gccollab.ca/openid';
# account client ID
if (!process.env.REACT_APP_OIDC_CLIENT_ID)
  process.env.REACT_APP_OIDC_CLIENT_ID = 123;
```
After you config the start script with your end points:
```
yarn install
yarn start
```

### Developing with Docker

If you do not have these services spun you can create a full end to end environment through 

`docker-compose` up will deploy and configure to work together the following services:
- Directory-fe on port 8008
- Profile service
- Notification service
- Search
- RabbitMQ
- Account on port 8080

```
cd docker-e2e
docker-compose up
```
## Deploying

### Deploy with Docker
```
docker build --tag gctools/directory .
docker run -p 5000:5000 gctools/directory
```
## Features
### Project Structure :file_folder:

```
|-/config/
|-/docker-e2e
|-/docker
|-/i18n/  # Translations
|-/kubernetes/
|-/public/
|-/scripts/
|-/src/
|  |-/assets/
|  |  |-css # A place for additional styling
|  |  |-imgs  # Image / graphic assets
|  |-/components/
|  |  |-/core/  # Components used in multiple places
|  |  |-/page_or_feature_specific/ # Create folders for each page
|  |-/conatiners/ # Top level page containers
|  |-/gql/ # GraphQL queries and mutations in one place to be leveraged througout the app
```

### Component Library and Styling :art:
We leverage the [Aurora Design system](https://design.gccollab.ca/) which is a theme based on [Bootstrap](https://getbootstrap.com/).
The app comes already packaged with the [Aurora stylesheet](https://www.npmjs.com/package/@gctools-components/aurora-css) and [Reactstrap](https://reactstrap.github.io/components/alerts/) to help you build components quickly.

### Apollo Client and GraphQL

Learn about how to leverage Apollo Client for react to handle [queries](https://www.apollographql.com/docs/react/essentials/queries.html) and [mutations](https://www.apollographql.com/docs/react/essentials/mutations.html).

### I18N :earth_americas:

Localization is set up and configured with this [I18N translation webpack plugin](https://github.com/gctools-outilsgc/gctools-components/tree/master/packages/i18n-translation-webpack-plugin) and it's [React Helper package](https://github.com/gctools-outilsgc/gctools-components/tree/master/packages/react-i18n-translation-webpack).

#### How to use it
```
import React from 'react';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

class MyComponent extends React.Component {
  render() {
    <p>{__('this is translated text')}</p>
  }
}

export default LocalizedComponent(MyComponent);
```
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
