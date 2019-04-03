const passport = require('passport');
const express = require('express');
const router = express.Router();
const msgAPIController = require('../controllers/msg-api');
const userAPIController = require('../controllers/user-api');


router.post('/users', userAPIController.registerNewUser);
router.get('/users/login',
    passport.authenticate('basic', { session: false }),
    userAPIController.loginUser);

router.route('/msgs')
.get(msgAPIController.getAllMessagesOrderedByLastPosted)
.post(passport.authenticate('basic', { session: false }),
msgAPIController.addNewMessage);

router.route('/msgs/:messageid')
.get(msgAPIController.getSingleMessage);

module.exports = router;