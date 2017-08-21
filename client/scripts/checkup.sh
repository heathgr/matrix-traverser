export CURRENT_NODE_ENV=$NODE_ENV
export NODE_ENV='test'
echo "\nRUNNING YOUR CODE CHECKUP LIKE A BOSS!!!\n"
echo "ESLINT:\n"
node_modules/.bin/eslint ./src ./spec
echo "\nMOCHA:\n"
./scripts/test.sh
echo "\n"
export NODE_ENV=$CURRENT_NODE_ENV
exit 0;
