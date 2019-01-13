var models  = require('../models')

/* for insert to database  */
exports.insert = async (modelsName, isParams, callback) => {
    models[modelsName].create(isParams).nodeify(callback)
};
