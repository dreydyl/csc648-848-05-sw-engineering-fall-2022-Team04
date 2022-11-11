const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();
var app = express();
// router.post("/", userControllers.createUser, (req, res, next) => {
//     console.log(req);
//     res.send(''); //TODO set response
// });

// router.post("/login", userControllers.login, (req, res, next) => {
//     console.log(req);
//     res.send(''); //TODO set response
// });

router.route("/signup").post(userControllers.createUser);
router.route("/login").post(userControllers.login);
router.route("/logout").get(userControllers.logout);
// app.get('/',(req,res) => {
//     session=req.session;
//     if(session.userid){
//         res.send("Welcome User <a href=\'users/logout'>click to logout</a>");
//     }else
//     res.render("userProfilePage", { title: "EZRent Profile" });
// });

module.exports = router;
