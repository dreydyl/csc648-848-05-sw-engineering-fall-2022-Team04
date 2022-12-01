const User = require('../model/User');
const Register = User.Register;
const Update = User.Update;

const Review = User.Review;
const Rating = User.Rating;
const bcrypt = require("bcrypt");
var validator = require("email-validator");

// exports.getAllUsers =  async  (req, res, next ) => {
//     try {
//         const [registeredUser, _] = await Register.getAll();

//         res.status(200).json({count: registeredUser.length, registeredUser}); 
//     } catch (error) {
//         console.log(error);
//         next(error);  
//     }
// }

// const checkUsername = (username) => {

//     let usernameChecker = /^\D\w{2,}$/;
//     return usernameChecker.test(username);
// }
    
const checkPassword = (password) => {
        let passwordChecker = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordChecker.test(password);
}
    
// const checkEmail = (email) => {
//         let emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//         return emailChecker.test(email);
// }
    

exports.createUser = async (req, res, next) => {
    try {
        let { firstName, lastName, password, email, confirmPassword, role } = req.body;
        //console.log(password);
        const hashpassword = bcrypt.hashSync(password, 10);
        //const hashpassword = sc.encrypt(password, 10);
        if(role != "landlord"){
            role = 'renter';
        }
        console.log(role);
        let register = new Register(firstName, lastName, hashpassword, email, role);
        let count = await Register.checkEmail(email);
        
        if (count[0] != 0) {
            res.status(409).json({ message: "Email already exists! ", count});
        }

        else if (confirmPassword != password || !checkPassword(password)) {
            res.status(409).json({ message: "Incorrect password" });
        }

        else if(!validator.validate(email))
        {
            res.status(409).json({ message: "Incorrect email format"})
        }
        else {
            register = await register.save();
            res.status(201).json({ message: "User created " });
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}

exports.demoLogin = async (req, res, next) => {
    let { password, email } = req.body;
    //start session with email
    
}



exports.login = async (req, res, next) => {
    try {
        
        let { password, email } = req.body;
        let count = await Register.checkEmail(email);
        if (count[0].length == 0) {
            res.status(404).json({ message: "User Not Found" });
        }
        else {
            const hashedpassword = await Register.getPassword(email);
            const temp = hashedpassword[0];
            const newHashedPassword = temp[0].password;
            //console.log(req.session);
            if (await bcrypt.compare(password, newHashedPassword)) {
                if(req.session.admin && req.session.email == email){
                    console.log(req.session);
                    console.log("User already logged in");
                    res.redirect('/');
                }
                else{
                    req.session.email = email;
                    req.session.admin = true;
                    console.log(req.session);
                    console.log("---------> Login Successful");
                    res.redirect('/');
                }
                // res.send(`Hey there, welcome <a href=\'logout'>click to logout</a>`);
            }
            // console.log(sc.decrypt(stringObj));
            // if (password == sc.decrypt(stringObj)) {
            //     console.log("---------> Login Successful")
            //     // res.send(`${email} is logged in!`);
            //     res.send(`Hey there, welcome <a href=\'users/logout'>click to logout</a>`);
    
            // }
            else {
                console.log("---------> Password Incorrect")
                res.send("Password incorrect!")
            }
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}

exports.logout = async (req, res, next) => {
    req.session.destroy();
    console.log("---------> Successfully Logout");
    next(error);
    res.redirect('/');
}

exports.update = async (req, res, next) => {
    try{
        let bio = req.body;
        console.log(bio);
        let picture = req.file;
        let update = new Update(bio, picture, req.session.email);
        update = await update.update();
        res.send({message: 'User Updated'});
    }
    catch(error){
        next(error);
    }
}

exports.createReview = async (req, res, next) => {
    try{
        let {rating, description} = req.body;
        let reg_user_id = await Review.getUserbyEmail(req.session.email);
        reg_user_id = reg_user_id[0];
        reg_user_id = reg_user_id[0].reg_user_id;
        let id = req.params.id;
        id = parseInt(id);
        let referUserId = await Review.getUserbyId(id);
        referUserId = referUserId[0];
        referUserId = referUserId[0].reg_user_id;
        let review = new Review(reg_user_id, rating, description, referUserId);
        review = await review.save();
        res.status(201).json({ message: "Review created " });
    }
    catch(error){
        next(error);
    }
    
}

exports.getUserProfile = async (req, res, next) => {
    try{
        let id = req.params.id;
        let role = await Review.getRole(id);
        role = role[0];
        role = role[0].role;
        console.log(role);
        if(role == 'landlord'){
            let sum = 0;
            let user_rating;
            let userRating = await Review.getLandlordRating(id);
            userRating = userRating[0];
            if(userRating != 0){
                for(let i = 0; i < userRating.length; i++)
                {
                    let temp = parseFloat(userRating[i].rating);
                    sum += temp;
                }
                user_rating = sum / userRating.length;
            }
            let update_rating = new Rating(id, user_rating);
            update_rating = await update_rating.update_rating();
            let profile = await Review.getLandlordProfile(id);
            let getReview = await Review.getLandlordReview(id);
            profile = profile[0];
            getReview = getReview[0];
            profile.push(getReview);
            res.status(201).json({profile});
        }
        else{
            let profile = await Review.getRenterProfile(id);
            profile = profile[0];
            let getWrittenReview = await Review.getRenterWrittenReview(id);
            getWrittenReview = getWrittenReview[0];
            profile.push(getWrittenReview);
            console.log(profile);
            res.status(201).json({profile});
        }
       
        
    }
    catch (error){
        next(error);
    }
}


exports.getLandlordList = async (req, res, next) => {
    try{
        let name = req.params.name;
        name = name.charAt(0).toUpperCase() + name.slice(1);
        let LandlordList = await Review.getLanlordList(name);
        LandlordList = LandlordList[0];
        res.status(200).json({LandlordList});
    }
    catch(error){
        next(error);
    }
}
// exports.register = async (req, res, next) => {
//     try {
//         //parse json
//         let { name, email, password } = req.body;
//         // hash password
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         //TODO server-side validation here
//         if (!checkUsername(username)) {
//             req.flash('error', "invalid username!!!");
//             req.session.save(err => {
//                 res.redirect("/registration");
//             });
//         } else if (!checkEmail(email)) {
//             req.flash('error', "invalid Email!!!");
//             req.session.save(err => {
//                 res.redirect("/registration");
//             });

//         } else if (!checkPassword(password)) {
//             req.flash('error', "Password must be at least8 characters long, contains Upper and lower case characters, and a special character");
//             req.session.save(err => {
//                 res.redirect("/registration");
//             })

//         } else if (password != cpassword) {
//             req.flash('error', "password did not match");
//             req.session.save(err => {
//                 res.redirect("/registration");
//             });
//         } else {
//             next();
//         }

//         register = await User.register(name, email, password);

//         res.status(201).json({ message: "User created " });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// }

// //TODO
// exports.login = async (req, res, next) => {
//     //use sessions
// }

// //TODO
// exports.getFeaturedLandlords = async (req, res, next) => {
//     let search = req.params.search;
//     try {
//         let results = await User.getFeaturedLandlords();

//         console.log(results);

//         res.locals.results = results;

//         next();
//     } catch (error) {
//         console.log(error);
//         next(error);  
//     }
// }

// exports.getLandlordsBySearch = async (req, res, next) => {
//     let search = req.params.search;
//     try {
//         const [landlord, _] = await User.getLandlordsBySearch();

//         console.log(landlord);

//         res.locals.results = landlord;

//         next();
//     } catch (error) {
//         console.log(error);
//         next(error);  
//     }
// }

exports.searchLandlords = async (req, res, next) => {
    let search = req.query.search;
    res.locals.searchTerm = search;
    if (!search) {
        res.locals.error = "No search term given";
        res.render('error', { title: "EZRent " });
    } else {
        try {
            //let results = await Listing.search(search);
            let results = {
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
            if (results) {
                res.locals.results = results;
                res.render('landlordResults', { title: "EZRent " + search, header: "Results" });
            } else {
                console.log("no results");
                res.render('landlordResults', { title: "EZRent " + search, header: "Results" });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}