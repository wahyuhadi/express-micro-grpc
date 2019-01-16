/*  author : wahyuhadi */
 
let QueryService = require('../services/QueryService')
let Async = require('async')
exports.userRegistration =  async (req, res, next) => {
    let userParams = req.body;
    QueryService.Insert('users', userParams, (err, response) => {
        if (!err) {
            return res.status(200).json({ code: 200, error: false, status: 'success', message: "succes create users", result: response});
        } else {
            return res.status(401).json({ code: 401, error: true,status: 'error', message: err.errors[0].message, result: null});
        }
    })       
}

exports.getAllUsers = async (req, res, next) => {
	QueryService.SelectAll('users', {}, (err, response) => {
		if (!err) {
            return res.status(200).json({ code: 200, error: false, status: 'success', message: "succes get users", result: response});
		} else {
			return res.status(401).json({ code: 401, error: true,status: 'error', message: err.errors[0].message, result: null});
		}
	})
}


exports.loginUser = async (req, res, next) => {
	
	/* get Email When true in DB  */
	function getEmail (callback){

		if (!req.body.email || !req.body.password) {			
			return res.status(401).json({ code: 401, error: true,status: 'error', message: "Email and Password Cannot be Empety", result: null});
		}

		let isParams = { where : { email : req.body.email} }
		QueryService.SelectOne('users', isParams, (err, result) => {
			if (!result || err) {
				return res.status(401).json({ code: 401, error: true,status: 'error', message: "Opps your user not found", result: null});
			} else {
				callback(null , req.body.password, result)
			}
		});
		
	}

	/* for compare password with bcrypt */
	function getDefaultPassword (password, args , callback) {
		callback(null, password)
	}

	/* watterfall async */
	Async.waterfall ([
		getEmail,
		getDefaultPassword
	], (err, response) => {
		if (!err) {
			return res.status(200).json({ code: 200, error: false, status: 'success', message: "succes get users", result: response});
		} else {
			return res.status(401).json({ code: 401, error: true,status: 'error', message: err, result: null});
		}
	})
}