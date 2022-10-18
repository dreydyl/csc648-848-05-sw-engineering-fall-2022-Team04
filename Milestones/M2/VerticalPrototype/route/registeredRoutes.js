const express = require('express');
const registerControllers = require('../controllers/registerControllers');
const router = express.Router();

router.route("/").get(registerControllers.getAllUsers).post(registerControllers.createNewUser);


module.exports = router;
