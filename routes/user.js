/* for variable */
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UsersController')
const AuthController = require('../controllers/AuthController')


/* router index */
router.post('/', [UserController.userRegistration]);
router.get('/',[AuthController.DecodeTokenUser, UserController.getAllUsers])
router.post('/auth', [UserController.loginUser]);

/* Export modules */
module.exports = {
    router
}
