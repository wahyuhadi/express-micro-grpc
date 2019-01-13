let QueryService = require('../services/QueryService')

/* user registration controllers */
exports.userRegistration = async (req, res, next) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.body.role = 'users'
    let userParams = req.body;
    QueryService.insert('users', userParams, (err, response) => {
        if (!err) {
            return res.status(200).json({ code: 200, status: 'success', message: "succes create users", result: response, connection_from : ip });
        } else {
            return res.status(401).json({ code: 401, status: 'error', message: err.errors[0].message, result: null, connection_from : ip });
        }
    })
}