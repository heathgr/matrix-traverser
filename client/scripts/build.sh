node_modules/.bin/eslint ./src ./spec &&
node_modules/.bin/_mocha --require jsdom.config.js --compilers js:babel-core/register --recursive spec/**/*.spec.js &&
node_modules/.bin/webpack --config webpack.production.config.js -p;
exit 0;
