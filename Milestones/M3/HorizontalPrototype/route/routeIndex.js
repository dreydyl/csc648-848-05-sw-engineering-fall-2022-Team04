const { response } = require('express');
const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();

/*
router.get("/", userControllers.getFeaturedLandlords, (req, res, next) => {
    res.render("main",{title:"EZRent Home"});
});
*/
router.get("/", (req, res, next) => {
    let hooks = {
        "welcome": {
            name:"welcome",
            hook:"Renting Made EZ."
        },
        "listing": {
            name:"listing",
            hook:"Find the perfect home."
        },
        "landlord": {
            name:"landlord",
            hook:"Meet the top landlords in your area."
        },
        "review": {
            name:"review",
            hook:"Avoid bad landlord experiences."
        },
        "signup": {
            name:"signup",
            hook:"Join us. Make renting homes EZ."
        },
    };
    let listings = {
        "listing":{
            "landlord":"Bob John",
            "price":"40,000",
            "description":"Basically a resort",
            "street_number":"1234",
            "street":"Fall Street",
            "city":"Stockton",
            "state":"CA",
            "zip":"94545",
            "rooms":2,
            "baths":1,
            "top_review":{
                "rating":4,
                "author":"Staniel Chaniel",
                "description":"Love this place"
            }
        },
        "listing2":{
            "landlord":"John Bob",
            "price":"12,000",
            "description":"Cool place",
            "street_number":"1234",
            "street":"Span Avenue",
            "city":"Hayward",
            "state":"CA",
            "zip":"94545",
            "rooms":4,
            "baths":3,
            "top_review":{
                "rating":2,
                "author":"Wacko Fall",
                "description":"Not a cool place"
            }
        },
        "listing3":{
            "landlord":"Job Bohn",
            "price":"50,000",
            "description":"Perfect for family",
            "street_number":"1234",
            "street":"Ballast Court",
            "city":"San Francisco",
            "state":"CA",
            "zip":"94545",
            "rooms":4,
            "baths":2,
            "top_review":{
                "rating":5,
                "author":"Alonzo Aball",
                "description":"My family loves this place"
            }
        }
    };
    res.locals.listings = listings;
    res.locals.hooks = hooks;
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