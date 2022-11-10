const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();

router.post("/register", userControllers.register, (req, res, next) => {
    console.log(req);
    res.send(''); //TODO set response
});

router.post("/login", userControllers.login, (req, res, next) => {
    console.log(req);
    res.send(''); //TODO set response
});

router.get("/search", userControllers.searchLandlords, (req, res, next) => {
    res.render("landlordResults");
});

module.exports = router;
