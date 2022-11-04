const express = require('express');
const listingControllers = require('../controllers/listingControllers');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const crypto = require('crypto');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images');
    },
    filename: function(req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
        //return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage: storage
});

<<<<<<< HEAD
router.route("/").get(listingControllers.getAllListings).post(upload.single('picture'),listingControllers.createNewListing, (req, res, next) => {
=======
/*
router.route("/").get(listingControllers.getAllUsers).post(upload.single('picture'),listingControllers.createNewUser, (req, res, next) => {
>>>>>>> frontend3
    console.log(req);
    res.send('');
});
*/

router.get("/:id(\\d+)", listingControllers.getListing, (req, res, next) => {
    res.render('partials/listingPage');
});

router.get("/search", listingControllers.searchListings, (req, res, next) => {
    res.render("listingResults");
});

//router.route("/search/:search").get(listingControllers.getListBySearch);


module.exports = router;