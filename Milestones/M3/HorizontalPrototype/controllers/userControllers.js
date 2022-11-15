const User = require('../model/User');
const bcrypt = require("bcrypt");

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> develop
// exports.getAllUsers =  async  (req, res, next ) => {
//     try {
//         const [registeredUser, _] = await Register.getAll();

//         res.status(200).json({count: registeredUser.length, registeredUser}); 
//     } catch (error) {
//         console.log(error);
//         next(error);  
//     }
// }

exports.createUser = async (req, res, next) => {
    try {
        console.log(req.body);
        let { name, password, email, confirmPassword } = req.body;
        //console.log(password);
        const hashpassword = await bcrypt.hashSync(password, 10);

        let register = new User(name, hashpassword, email);
        let count = await User.checkEmail(email);

        if (count[0] != 0) {
            //req.flash('error',"Email already exists")
            res.status(409).json({ message: "Email already exists! " });
        }
        else if (confirmPassword != password) {
            res.status(409).json({ message: "Incorrect password" });
        }
        else {
            register = await register.save();
            res.status(201).json({ message: "User created " });
        }
    }
    catch (error) {
<<<<<<< HEAD
=======
exports.getAllUsers = async (req, res, next) => {
    try {
        const [registeredUser, _] = await Register.getAll();

        res.status(200).json({ count: registeredUser.length, registeredUser });
    } catch (error) {
>>>>>>> frontend3
=======
>>>>>>> develop
        console.log(error);
        next(error);
    }
}

<<<<<<< HEAD
<<<<<<< HEAD
exports.demoLogin = async (req, res, next) => {
    let { password, email } = req.body;
    //start session with email
=======
    let usernameChecker = /^\D\w{2,}$/;
    return usernameChecker.test(username);
}

const checkPassword = (password) => {
    let passwordChecker = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordChecker.test(password);
}

const checkEmail = (email) => {
    let emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailChecker.test(email);
}

>>>>>>> frontend3

=======
exports.demoLogin = async (req, res, next) => {
    let { password, email } = req.body;
    //start session with email
    
>>>>>>> develop
}

exports.login = async (req, res, next) => {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
        let session = req.session;
=======
>>>>>>> develop
        let { password, email } = req.body;
        let count = await User.checkEmail(email);
        console.log(count[0]);
        if (count[0].length == 0) {
            res.status(404).json({ message: "User Not Found" });
<<<<<<< HEAD
=======
        //parse json
        let { name, email, password } = req.body;
        //TODO server-side validation here
        if (!checkUsername(username)) {
            req.flash('error', "invalid username!!!");
            req.session.save(err => {
                res.redirect("/registration");
            });
        } else if (!checkEmail(email)) {
            req.flash('error', "invalid Email!!!");
            req.session.save(err => {
                res.redirect("/registration");
            });

        } else if (!checkPassword(password)) {
            req.flash('error', "Password must be at least8 characters long, contains Upper and lower case characters, and a special character");
            req.session.save(err => {
                res.redirect("/registration");
            })

        } else if (password != cpassword) {
            req.flash('error', "password did not match");
            req.session.save(err => {
                res.redirect("/registration");
            });
        } else {
            next();
>>>>>>> frontend3
=======
>>>>>>> develop
        }
        else {

            const hashedpassword = await User.getPassword(email);
<<<<<<< HEAD
=======

>>>>>>> develop
            const newHashedPassword = hashedpassword[0];
            var stringObj = JSON.stringify(newHashedPassword);

<<<<<<< HEAD
            stringObj = stringObj.substring(14, stringObj.length - 3);
            
            // session.email = email;
            
            if (await bcrypt.compare(password, stringObj)) {
                console.log("---------> Login Successful")
                // res.send(`${email} is logged in!`);
                res.send(`Hey there, welcome <a href=\'users/logout'>click to logout</a>`);
    
            }
            else {
                console.log("---------> Password Incorrect")
                res.send("Password incorrect!")
            }
        }
    }
    catch (error) {
<<<<<<< HEAD
=======
        res.status(201).json({ message: "User created " });
    } catch (error) {
>>>>>>> frontend3
=======
>>>>>>> develop
        console.log(error);
        next(error);
    }

}

exports.logout = async (req, res, next) => {
    req.session.destroy();
    res.render("main");
}

// const checkUsername = (username) => {

//     let usernameChecker = /^\D\w{2,}$/;
//     return usernameChecker.test(username);
// }

// const checkPassword = (password) => {
//     let passwordChecker = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//     return passwordChecker.test(password);
// }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> develop
// const checkEmail = (email) => {
//     let emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return emailChecker.test(email);
// }
<<<<<<< HEAD
=======
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}
>>>>>>> frontend3
=======
>>>>>>> develop


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

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> develop
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
<<<<<<< HEAD
=======
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}
=======
>>>>>>> develop

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
<<<<<<< HEAD
}
>>>>>>> frontend3
=======
}
>>>>>>> develop
