const express = require('express');
const listingControllers = require('../controllers/listingControllers');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const crypto = require('crypto');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
        //return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage: storage
});
/*
router.route("/").get(listingControllers.getAllUsers).post(upload.single('picture'),listingControllers.createNewUser, (req, res, next) => {
    console.log(req);
    res.send('');
});
*/


router.route("/").post( upload.single('pic'), listingControllers.createNewListing);
// router.get("/:id", listingControllers.getListBySearch, (req, res, next) => {
//     res.render('partials/listingPage');
// });

router.get("/search", listingControllers.searchListings, (req, res, next) => {
    if (req.session.admin) {
        res.locals.logged = true;
    }
    console.log("/search");
    res.render("listingResults");
});

router.get("/searchfilters", listingControllers.applyFilters, (req, res, next) => {
    if (req.session.admin) {
        res.locals.logged = true;
    }
    console.log("/searchfilters");
    res.render("listingResults");
});


router.get("/search-test", (req, res, next) => {
    let listings = {
        "listing1": {
            "id":"0",
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
            "id":"1",
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
            "id":"2",
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
    res.locals.results = listings;
    if (req.session.admin) {
        res.locals.logged = true;
    }
    console.log("/search-test");
    res.render("listingResults");
});

<<<<<<< Updated upstream
router.get("/:id", listingControllers.getListing, (req, res, next) => {
    if (req.session.admin) {
        res.locals.logged = true;
    }
    console.log("/:id");
    res.render("listingPage", { title: "EZRent Listing", style: "listingPage" });
});
=======
router.route("/:id").get(listingControllers.getListing);

// router.get("/:id", listingControllers.getListing, (req, res, next) => {
//     let listing = {
//         "landlord": {
//             "name": "Job Bohn",
//             "rating": 5,
//             "img": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//             "bio": "Hello there",
//             "email": "job@gmail.com",
//             "phone": "+1-707-000-0001"
//         },
//         "rating": 4,
//         "img": "../images/picture_1666042712023.jpeg",
//         "price": "50,000",
//         "description": "Perfect for family",
//         "street_number": "1234",
//         "street": "Ballast Court",
//         "city": "San Francisco",
//         "state": "CA",
//         "zip": "94545",
//         "rooms": 4,
//         "baths": 2,
//         "reviews": {
//             "review1": {
//                 "title": "Wowow",
//                 "rating": 4,
//                 "author": "Alonzo Aball",
//                 "description": "My family loves this place"
//             },
//             "review2": {
//                 "title": "Wowow",
//                 "rating": 4,
//                 "author": "Alonzo Aball",
//                 "description": "My family loves this place"
//             },
//             "review3": {
//                 "title": "Wowow",
//                 "rating": 4,
//                 "author": "Alonzo Aball",
//                 "description": "My family loves this place"
//             },
//         }
//     };
//     res.locals.listing = listing;
//     if (req.session.admin) {
//         res.locals.logged = true;
//     }
//     console.log("/:id");
//     res.render("listingPage", { title: "EZRent Listing", style: "listingPage" });
// });
>>>>>>> Stashed changes

//router.route("/search/:search").get(listingControllers.getListBySearch);


module.exports = router;