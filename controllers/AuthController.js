/*  author : wahyuhadi */
let jwt = require('../services/JWTService')

exports.DecodeTokenUser = async (req, res, next) => {
	let token = req.headers.token
	if (!token) {
		return res.status(401).json({ code: 401, error: true,status: 'error', message: 'Opps user token required', result: null});
	} else {
		/* decode token  */
		jwt.decodeJWT(token, (err, decode) => {
			if (err) {
				return res.status(401).json({ code: 401, error: true,status: 'error', message: 'Opps user token required', result: null});
			} else {
				if (!decode || decode.role !== 'user') {
					return res.status(401).json({ code: 401, error: true,status: 'error', message: 'Error token detected', result: null});
				} else {
					delete decode.iat /* for security */
					res.locals.token = decode /* add middleware */
					next()
				}
			}
		})
	}
};