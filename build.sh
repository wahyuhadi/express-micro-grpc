echo "Auto Build ... "
echo "NPM install ...."
# npm install
echo "NPM install done"
sleep 1
echo "DB migration ..."
node node_modules/.bin/sequelize db:migrate
echo "DB migrate done"
sleep 1
