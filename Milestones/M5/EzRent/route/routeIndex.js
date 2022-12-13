const { response } = require('express');
const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();


/*
router.get("/", userControllers.getFeaturedLandlords, (req, res, next) => {
    res.render("main",{title:"EZRent Home"});
});
*/

router.get("/", async (req, res, next) => {
    
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
    // res.locals.landlords = userControllers.getFeaturedLandlords();
    // console.log("index: "+res.locals.landlords);
    await userControllers.getFeaturedLandlords()
    .then(landlords => {
        res.locals.landlords = landlords;
        console.log("index: "+landlords);
    })
    .catch(error => {
        console.log(error);
    });
    await userControllers.getBadReview()
    .then(review => {
        res.locals.badReview = review;
    })
    let badReview = {
        "author": "Jerry Boxberger",
        "rating": 1,
        "title": "Horrendous. No compassion",
        "description": `I have a sick mother. This landlord raised my rent 3 times in the last 14 months because of the "economy".`
    }
    res.locals.hooks = hooks;
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render("main", { title: "EZRent Home", style: "main"});
});

/* Frontend Tests */
//to test page, use localhost:8080/(route_name)
//e.g. localhost:8080/postlisting to go to postListingPage
//will be renamed and migrated to userRoutes.js and listingRoutes.js

router.get("/postlisting", async (req, res, next) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render("postListingPage", { title: "EZRent New Listing" });
});

router.get("/listingpage", async (req, res, next) => {
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
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render("listingPage", { title: "EZRent Listing", style: "listingPage" });
});

router.get("/profilepage", async (req, res, next) => {
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
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render("profilePage", { title: "EZRent Profile" });
});

router.get("/userprofilepage", async (req, res, next) => {
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
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render("userProfilePage", { title: "EZRent Profile" });
});

router.get("/postListingPage", async (req, res, next) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render("postListingPage", { title: "EZRent Profile" });
});

router.get("/login", async (req, res, next) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render("loginpage", { title: "EZRent Login" });
});

router.get("/register", async (req, res, next) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render("registration", { title: "EZRent New Account" });
});

router.get("/renter", async (req, res, next) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render("profilePage", { title: "EZRent Renter" });
});

router.get("/landlord", async (req, res, next) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render("landlordPage", { title: "EZRent Landlord" });
});

router.get("/help", async (req, res, next) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render("helppage", { title: "EZRent Help" });
});

router.get("/searchresults", async (req, res, next) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render("searchpage", { title: "EZRent Search" });
});

router.get('/about', async (req, res) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render('about/about', { title: "EZRent Search" });
});

router.get('/devAbout', async (req, res) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render('about/devAbout');
});

router.get('/issaAbout', async (req, res) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render('about/issaAbout');
});

router.get('/youssefAbout', async (req, res) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render('about/youssefAbout');
});

router.get('/tungAbout', async (req, res) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render('about/tungAbout');
});

router.get('/praiseAbout', async (req, res) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render('about/praiseAbout');
});

router.get('/ricardoAbout', async (req, res) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await userControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    res.render('about/ricardoAbout');
});

module.exports = router;