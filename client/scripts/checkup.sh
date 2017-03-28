export CURRENT_NODE_ENV=$NODE_ENV
export NODE_ENV='test'
echo "\nRUNNING YOUR CODE CHECKUP LIKE A BOSS!!!\n"
echo "ESLINT:\n"
node_modules/.bin/eslint ./src ./spec
echo "\nMOCHA:\n"
node_modules/.bin/_mocha --require jsdom.config.js --compilers js:babel-core/register --recursive spec/**/*.spec.js
echo "\n"
export NODE_ENV=$CURRENT_NODE_ENV
exit 0;
