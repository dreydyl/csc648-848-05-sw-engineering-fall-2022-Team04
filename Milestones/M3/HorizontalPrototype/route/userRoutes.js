const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();

router.post("/register", (req, res, next) => {
    //server side validation
});

router.post("/login", (req, res, next) => {
    //server side validation
});

module.exports = router;
