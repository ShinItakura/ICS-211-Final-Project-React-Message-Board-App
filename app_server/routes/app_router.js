
const express = require('express');
const router = express.Router();
const msgController = require('../controllers/msg');

/* GET home page. */
//router.get('/', msgController.index);
router.get('/', msgController.getMessages);

module.exports = router;