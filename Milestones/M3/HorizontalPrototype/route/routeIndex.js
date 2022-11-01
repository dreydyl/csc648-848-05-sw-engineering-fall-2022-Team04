const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();

router.get("/", userControllers.getFeaturedLandlords, (req, res, next) => {
    res.render("main",{title:"EZRent Home"});
});

/* Frontend Tests */
//to test page, use localhost:8080/(route_name)
//e.g. localhost:8080/postlisting to go to postListingPage
//will be renamed and migrated to userRoutes.js and listingRoutes.js

router.get("/postlisting", (req, res, next) => {
    res.render("postListingPage",{title:"EZRent New Listing"});
});

router.get("/listingpage", (req, res, next) => {
    res.render("listingPage",{title:"EZRent Listing"});
});

router.get("/login", (req, res, next) => {
    res.render("loginpage",{title:"EZRent Login"});
});

router.get("/register", (req, res, next) => {
    res.render("registration",{title:"EZRent New Account"});
});

router.get("/renter", (req, res, next) => {
    res.render("profilePage",{title:"EZRent Renter"});
});

router.get("/landlord", (req, res, next) => {
    res.render("landlordPage",{title:"EZRent Landlord"});
});

router.get("/help", (req, res, next) => {
    res.render("helppage",{title:"EZRent Help"});
});

router.get("/searchresults", (req, res, next) => {
    res.render("searchpage",{title:"EZRent Search"});
});

module.exports = router;