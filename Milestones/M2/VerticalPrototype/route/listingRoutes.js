const express = require('express');
const listingControllers = require('../controllers/listingControllers');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

router.route("/").get(listingControllers.getAllUsers).post(upload.single('picture'),listingControllers.createNewUser);
router.route("/:zipcode").get(listingControllers.getListByZipcode);
//router.route("/:city").get(listingControllers.getListByCity);


module.exports = router;