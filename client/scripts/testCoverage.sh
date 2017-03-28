export CURRENT_NODE_ENV=$NODE_ENV
export NODE_ENV='test'
echo "\nGENERATING MOCHA COVERAGE REPORTS LIKE A BOSS:\n"
node_modules/.bin/babel-istanbul cover node_modules/.bin/_mocha -- --require jsdom.config.js --recursive spec/**/*.spec.js
echo "\n"
export NODE_ENV=$CURRENT_NODE_ENV
open ./coverage/lcov-report/index.html
exit 0;
