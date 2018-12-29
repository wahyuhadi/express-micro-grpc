const express = require('express');
const router = express.Router();
const WelcomeController = require('../controllers/WelcomeController')




/* router index */
router.get('/', [WelcomeController.Welcome]);
router.get('/index', [WelcomeController.Mid, WelcomeController.Mid2]);


/* Export modules */
module.exports = {
    router
}
