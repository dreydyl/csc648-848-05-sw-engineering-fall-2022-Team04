const express = require('express');
const userControllers = require('../controllers/userControllers');
const multer = require('multer');
const router = express.Router();
const path = require('path');
// router.post("/register", userControllers.register, (req, res, next) => {
//     console.log(req);
//     res.send(''); //TODO set response
// });

// router.post("/login", userControllers.login, (req, res, next) => {
//     console.log(req);
//     res.send(''); //TODO set response
// });
var sessionChecker = (req, res, next) => {    
    console.log(`Session Checker: ${req.session.id}`);
    console.log(req.session);
    if (req.session.email) {
        console.log(`Found User Session`);
        next();
    } else {
        console.log(`No User Session Found`);
        res.redirect('/login');
    }
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
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


router.get('/', sessionChecker, async function(req, res, next) {
    res.redirect('/profilePage');
});
router.route("/signup").post(userControllers.createUser);
router.route("/login").post(userControllers.login);
router.route("/logout").get(userControllers.logout);
router.route("/update").post(userControllers.update, upload.single('picture'));



module.exports = router;
