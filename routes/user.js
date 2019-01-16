/* for variable */
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UsersController')

/* router index */
router.post('/', [UserController.userRegistration]);
router.get('/',[UserController.getAllUsers])
router.post('/auth', [UserController.loginUser]);

/* Export modules */
module.exports = {
    router
}
