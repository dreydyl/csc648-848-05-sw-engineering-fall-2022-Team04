const express = require('express');
const listingControllers = require('../controllers/listingControllers');
const router = express.Router();

router.route("/").get(listingControllers.getAllUsers).post(listingControllers.createNewUser);


module.exports = router;