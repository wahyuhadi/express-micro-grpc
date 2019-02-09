/*  author : wahyuhadi */
 
let QueryService = require('../services/QueryService')
let Async = require('async')

exports.TestAPI = async (req, res, next) => {
	var nama = req.params.lab	
	var id = req.query.id

	let response = {
		"nama" : nama,
		"id" : id
	}

	return res.status(200).json({error: false,code: 200, status:"success", message: "Apps runnings", result: response});
},

exports.AddData = async (req, res, next) => {
	let isData = {
		username : req.query.username,
		email : req.query.email,
		role : "user"
	}
	QueryService.Insert("users", isData, function(err, succes){
		if (err) {
			return res.status(401).json({error: true,code: 401, status:"error", message: "Error when insert data", result: err});
		} else {
			return res.status(200).json({error: false,code: 200, status:"success", message: "Succes Insert", result: succes});
		}
	})
},

exports.GetData = async (req, res, next) => {

	let isData = {}
	if (req.query.id) {
		isData.where = {
			id : req.query.id
		}
	} else {
		isData = {}
	}
	// SELECT * FROM USERS 
	QueryService.SelectAll("users", isData, function(err, succes){
		if (err) {
			return res.status(401).json({error: true,code: 401, status:"error", message: "Error when insert data", result: err});
		} else {
			return res.status(200).json({error: false,code: 200, status:"success", message: "Succes Insert", result: succes});
		}
	})
}