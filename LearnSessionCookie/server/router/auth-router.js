const express = require('express');
const router = express.Router()

const authController = require('../controller/auth-controller');


router.route('/register').post(authController.register);

router.route('/login').post(authController.login);

router.route('/logout').post(authController.logout);

router.route('/dashboard').get(authController.dashboard);


module.exports = router