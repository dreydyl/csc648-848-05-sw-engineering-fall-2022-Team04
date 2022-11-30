const { response } = require('express');
const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();
var geoip = require('geoip-lite');

/*
router.get("/", userControllers.getFeaturedLandlords, (req, res, next) => {
    res.render("main",{title:"EZRent Home"});
});
*/

router.get("/", (req, res, next) => {
    let ip = req.ip;
    var geo = geoip.lookup(ip);
    let hooks = {
        "welcome": {
            name: "welcome",
            hook: "Rule to the Renters."
        },
        "listing": {
            name: "listing",
            hook: "Find the perfect home."
        },
        "landlord": {
            name: "landlord",
            hook: "Meet the top landlords in your area."
        },
        "review": {
            name: "review",
            hook: "Avoid bad landlord experiences."
        },
        "signup": {
            name: "signup",
            hook: "Join us. Make renting homes EZ."
        },
    };
    let listings = {
        "listing1": {
            "landlord": "Bob John",
            "price": "40,000",
            "description": "Basically a resort",
            "street_number": "1234",
            "street": "Fall Street",
            "city": "Stockton",
            "state": "CA",
            "zip": "94545",
            "rooms": 2,
            "baths": 1,
            "top_review": {
                "title": "Love it",
                "rating": 5,
                "author": "Staniel Chaniel",
                "description": "Love this place"
            }
        },
        "listing2": {
            "landlord": "John Bob",
            "price": "12,000",
            "description": "Cool place",
            "street_number": "1234",
            "street": "Span Avenue",
            "city": "Hayward",
            "state": "CA",
            "zip": "94545",
            "rooms": 4,
            "baths": 3,
            "top_review": {
                "title": "Beautiful",
                "rating": 5,
                "author": "Dennis Dennis",
                "description": "There's a nice view"
            }
        },
        "listing3": {
            "landlord": "Job Bohn",
            "price": "50,000",
            "description": "Perfect for family",
            "street_number": "1234",
            "street": "Ballast Court",
            "city": "San Francisco",
            "state": "CA",
            "zip": "94545",
            "rooms": 4,
            "baths": 2,
            "top_review": {
                "title": "Wowow",
                "rating": 4,
                "author": "Alonzo Aball",
                "description": "My family loves this place"
            }
        }
    };
    let landlords = {
        "landlord1": {
            "name": "Sarah Therrien",
            "rating": 5,
            "bio": "I own multiple houses in the city. I've been faithfully serving tenants for 30 years.",
            "img": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        "landlord2": {
            "name": "George Stew",
            "rating": 5,
            "bio": "I own a condo downtown. I would love to meet you.",
            "img": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        },
        "landlord3": {
            "name": "Nick James",
            "rating": 5,
            "bio": "I let my reviews speak for themselves.",
            "img": "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1023&q=80"
        }
    };
    let badReview = {
        "author": "Jerry Boxberger",
        "rating": 1,
        "title": "Horrendous. No compassion",
        "description": `I have a sick mother. This landlord raised my rent 3 times in the last 14 months because of the "economy".`
    }
    res.locals.hooks = hooks;
    res.locals.listings = listings;
    res.locals.landlords = landlords;
    res.locals.badReview = badReview;
    res.render("main", { title: "EZRent Home", style: "main" });
    
});

/* Frontend Tests */
//to test page, use localhost:8080/(route_name)
//e.g. localhost:8080/postlisting to go to postListingPage
//will be renamed and migrated to userRoutes.js and listingRoutes.js

router.get("/postlisting", (req, res, next) => {
    res.render("postListingPage", { title: "EZRent New Listing" });
});

router.get("/listingpage", (req, res, next) => {
    let listing = {
        "landlord": {
            "name": "Job Bohn",
            "rating": 5,
            "img": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            "bio": "Hello there",
            "email": "job@gmail.com",
            "phone": "+1-707-000-0001"
        },
        "rating": 4,
        "img": "images/picture_1666042712023.jpeg",
        "price": "50,000",
        "description": "Perfect for family",
        "street_number": "1234",
        "street": "Ballast Court",
        "city": "San Francisco",
        "state": "CA",
        "zip": "94545",
        "rooms": 4,
        "baths": 2,
        "reviews": {
            "review1": {
                "title": "Wowow",
                "rating": 4,
                "author": "Alonzo Aball",
                "description": "My family loves this place"
            },
            "review2": {
                "title": "Wowow",
                "rating": 4,
                "author": "Alonzo Aball",
                "description": "My family loves this place"
            },
            "review3": {
                "title": "Wowow",
                "rating": 4,
                "author": "Alonzo Aball",
                "description": "My family loves this place"
            },
        }
    };
    res.locals.listing = listing;
    res.render("listingPage", { title: "EZRent Listing", style: "listingPage" });
});

router.get("/profilepage", (req, res, next) => {
    let user = {
        "name": "Britney Spears",
        "email": "bspears@gmail.com",
        "phone": "(650) 123-4567",
        "rating": "7/10",
        "bio": `Hello everyone, my name is Brittney Spears and I'm a 27 year old Accountant. I own a 3 bedroom house in San
        Francisco that is currently rented out by a wonderful family of 4. I love traveling to scenic countries and 
        hiking on big beautiful mountains.`
    }
    let reviews = [
        {
            "description": `Britney was very helpful during the application process. She was very responsive and the entire process
            was done in a few hours. She is truly an amazing landlord and I wish all landlords are like her.`
        },
        {
            "description": `Britney was very helpful during the application process. She was very responsive and the entire process
            was done in a few hours. She is truly an amazing landlord and I wish all landlords are like her.`
        }
    ];
    let listings = [
        {
            "bedrooms": `3`,
            "bathrooms": `2`,
            "price": `3500`
        },
        {
            "bedrooms": `5`,
            "bathrooms": `3.5`,
            "price": `5500`
        }
    ];
    res.locals.user = user;
    res.locals.reviews = reviews;
    res.locals.listings = listings;
    res.render("profilePage", { title: "EZRent Profile" });
});

router.get("/userprofilepage", (req, res, next) => {
    let user = {
        "name": "Britney Spears",
        "email": "bspears@gmail.com",
        "phone": "(650) 123-4567",
        "bio": `Hello everyone, my name is Brittney Spears and I'm a 27 year old Accountant. I own a 3 bedroom house in San
        Francisco that is currently rented out by a wonderful family of 4. I love traveling to scenic countries and 
        hiking on big beautiful mountains.`
    }
    let reviews = [
        {
            "description": `Britney was very helpful during the application process. She was very responsive and the entire process
            was done in a few hours. She is truly an amazing landlord and I wish all landlords are like her.`
        }
    ];
    res.locals.user = user;
    res.locals.reviews = reviews;
    res.render("userProfilePage", { title: "EZRent Profile" });
});

router.get("/postListingPage", (req, res, next) => {
    res.render("postListingPage", { title: "EZRent Profile" });
});

router.get("/login", (req, res, next) => {
    res.render("loginpage", { title: "EZRent Login" });
});

router.get("/register", (req, res, next) => {
    res.render("registration", { title: "EZRent New Account" });
});

router.get("/renter", (req, res, next) => {
    res.render("profilePage", { title: "EZRent Renter" });
});

router.get("/landlord", (req, res, next) => {
    res.render("landlordPage", { title: "EZRent Landlord" });
});

router.get("/help", (req, res, next) => {
    res.render("helppage", { title: "EZRent Help" });
});

router.get("/searchresults", (req, res, next) => {
    res.render("searchpage", { title: "EZRent Search" });
});

module.exports = router;