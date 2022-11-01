const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();

router.get("/", userControllers.getFeaturedLandlords, (req, res, next) => {
    res.render("main",{title:"EZRent Home"});
});

/* Frontend Tests */
//to test page, use localhost:8080/route
//e.g. localhost:8080/postlisting to go to postListingPage
//will be renamed and migrated to userRoutes.js and listingRoutes.js

router.get("/postlisting", (req, res, next) => {
    res.render("postListingPage",{title:"EZRent New Listing"});
});

router.get("/listingpage", (req, res, next) => {
    res.render("postListingPage",{title:"EZRent Listing"});
});

router.get("/login", (req, res, next) => {
    res.render("loginpage",{title:"EZRent Login"});
});

router.get("/register", (req, res, next) => {
    res.render("registration",{title:"EZRent New Account"});
});

router.get("/renter", (req, res, next) => {
    res.render("profilePage",{title:"EZRent New Account"});
});

router.get("/landlord", (req, res, next) => {
    res.render("landlordPage",{title:"EZRent New Account"});
});

router.get("/help", (req, res, next) => {
    res.render("helppage",{title:"EZRent New Account"});
});

router.get("/searchresults", (req, res, next) => {
    res.render("searchpage",{title:"EZRent New Account"});
});

module.exports = router;