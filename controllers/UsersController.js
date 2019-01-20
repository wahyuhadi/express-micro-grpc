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
	let isParams = {
		attributes: { exclude: ['password'] } 
	}
	QueryService.SelectAll('users', isParams, (err, response) => {
		if (!err) {
            return res.status(200).json({ code: 200, error: false, status: 'success', message: "succes get users", result: response});
		} else {
			return res.status(401).json({ code: 401, error: true,status: 'error', message: err.errors[0].message, result: null});
		}
	})
}

/* Login Users */
exports.loginUser = async (req, res, next) => {
	
	/* get Email When true in DB  */
	function getEmail (callback){
		/* validasi untuk body yang dibutuhkan */
		if (!req.body.email || !req.body.password) {			
			return res.status(401).json({ code: 401, error: true,status: 'error', message: "Email and Password Cannot be Empety", result: null});
		}

		let isParams = {  /* for query get emails */
			where: { email: req.body.email }
		}

		QueryService.SelectOne('users', isParams, (err, result) => {
			if (!result || err) {
				return res.status(401).json({ code: 401, error: true,status: 'error', message: "Opps your user not found", result: null});
			} else {
				if (result.role !== 'user') {
					return res.status(401).json({ code: 401, error: true, status: 'error', message: "Opps only user can login", result: null});
				} else {
					callback(null , req.body.password, result)
				}
				
			}
		});
		
	}

	/* for compare password with bcrypt */
	function checkValidPassword (isPassword, isDataGetMail , callback) {
		if (!isDataGetMail.validPassword(isPassword)) {
			return res.status(401).json({ code: 401, error: true,status: 'error', message: "Wrong Password", result: null});
		} else {
			let userLogin = {
				id : isDataGetMail.id,
				role: isDataGetMail.data,
				email: isDataGetMail.email,
				token: isDataGetMail.getJWT()
			}
			callback(null, userLogin)
		}
	}

	/* watterfall async */
	Async.waterfall ([
		getEmail,
		checkValidPassword
	], (err, response) => {
		if (!err) {
			return res.status(200).json({ code: 200, error: false, status: 'success', message: "succes login", result: response});
		} else {
			return res.status(401).json({ code: 401, error: true,status: 'error', message: 'Opps something error', result: null});
		}
	})
}

