
REACT_APP_GQL_ENDPOINT=$GQL_ENDPOINT \
yarn build

yarn global add serve
serve -s build