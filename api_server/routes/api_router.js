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
//.delete(msgAPIController.deleteAllMessage);

router.route('/msgs/:messageid')
.get(msgAPIController.getSingleMessage)
.delete(msgAPIController.deleteSingleMessage)
.put(msgAPIController.updateSingleMessage);

router.route('/msgs/:name')
.get(msgAPIController.getAllMessagesOrderedByLastPosted);






module.exports = router;