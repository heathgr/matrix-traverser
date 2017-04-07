export CURRENT_NODE_ENV=$NODE_ENV
export NODE_ENV='test'
echo "\nRUNNING YOUR TESTS LIKE A BOSS!!!\n"
find ./spec -type f -name "*.spec.js" -o -name "*.spec.jsx" | xargs node_modules/.bin/_mocha --require jsdom.config.js --compilers js:babel-core/register
export NODE_ENV=$CURRENT_NODE_ENV
exit 0;
