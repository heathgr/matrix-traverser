export CURRENT_NODE_ENV=$NODE_ENV
export NODE_ENV='test'
echo "\nRUNNING YOUR TESTS LIKE A BOSS!!!\n"
node_modules/.bin/_mocha $(find ./spec -type f -name "*.spec.js" -o -name "*.spec.jsx") --require jsdom.config.js --compilers js:babel-core/register
export NODE_ENV=$CURRENT_NODE_ENV
exit 0;
