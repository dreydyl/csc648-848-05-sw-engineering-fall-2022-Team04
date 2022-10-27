const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();

router.get("/", userControllers.getFeaturedLandlords, (req, res, next) => {
    res.render("main",{title:"EZRent Home"});
});

module.exports = router;
