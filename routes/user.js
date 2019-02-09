/* for variable */
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UsersController')
const AuthController = require('../controllers/AuthController')


/* router index */
// router.get("/contoh/:lab", [UserController.TestAPI])
router.get("/contoh/add", [UserController.AddData])
router.get("/contoh/all", [UserController.GetData])

/* Export modules */

module.exports = {
    router
}
