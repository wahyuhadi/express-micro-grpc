/* for variable */
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UsersController')

/* router index */
router.post('/', [UserController.userRegistration]);

/* Export modules */
module.exports = {
    router
}
