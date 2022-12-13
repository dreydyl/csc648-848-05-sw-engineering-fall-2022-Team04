const express = require('express');
const listingControllers = require('../controllers/listingControllers');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const crypto = require('crypto');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/listing');
    },
    filename: function (req, file, cb) {
        // let fileExt = file.mimetype.split('/')[1];
        // let randomName = crypto.randomBytes(22).toString("hex");
        // cb(null, `${randomName}.${fileExt}`);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
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


router.route("/").post(listingControllers.createNewListing);
// router.get("/:id", listingControllers.getListBySearch, (req, res, next) => {
//     res.render('partials/listingPage');
// });

router.get("/search", listingControllers.searchListings, async (req, res, next) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await listingControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    console.log("/search");
    res.render("listingResults");
});

router.get("/:id", listingControllers.getListing, async (req, res, next) => {
    if (req.session.admin) {
        res.locals.logged = true;
        await listingControllers.getProfileByEmail(req.session.email)
        .then(id => {
            res.locals.profileId = id[0][0].reg_user_id;
        });
    }
    console.log("/:id");
    res.render("listingPage", { title: "EZRent Listing", style: "listingPage" });
});

//router.route("/search/:search").get(listingControllers.getListBySearch);


module.exports = router;