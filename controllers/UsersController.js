let QueryService = require('../services/QueryService')

exports.userRegistration =  async (req, res, next) => {
    let userParams = req.body;
    QueryService.insert('users', userParams, (err, response) => {
        if (!err) {
            return res.status(200).json({ code: 200, error: false, status: 'success', message: "succes create users", result: response});
        } else {
            return res.status(401).json({ code: 401, error: true,status: 'error', message: err.errors[0].message, result: null});
        }
    })       
}