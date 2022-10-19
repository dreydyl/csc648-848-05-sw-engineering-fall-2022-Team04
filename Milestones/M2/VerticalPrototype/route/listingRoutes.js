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

router.route("/").get(listingControllers.getAllUsers).post(upload.single('picture'),listingControllers.createNewUser, (req, res, next) => {
    console.log(req);
    res.send('');
});
router.route("/:zipcode").get(listingControllers.getListByZipcode);
//router.route("/:city").get(listingControllers.getListByCity);


module.exports = router;