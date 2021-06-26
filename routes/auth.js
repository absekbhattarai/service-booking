const path = require('path');
const express = require('express');

const authController = require('../controllers/auth');

const isGuest= require('../middleware/is-guest');
const isAuth= require('../middleware/is-auth');

const router= express.Router();

//Get login page
router.get('/login', isGuest, authController.getLogin);

//Post login page
router.post('/login',isGuest, authController.postLogin);

//Get Register page
router.get('/register', isGuest, authController.getRegister);

//Post Register page
router.post('/register', isGuest, authController.postRegister);

//Post logout page
router.post('/logout', isAuth, authController.postLogout);

module.exports = router;