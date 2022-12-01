const User = require('../model/User');
const bcrypt = require("bcrypt");
var validator = require("email-validator");
var simplecrypt = require("simplecrypt");
var sc = simplecrypt();
var sessions = require('express-session');

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
        let { name, password, email, confirmPassword } = req.body;
        //console.log(password);
        const hashpassword = bcrypt.hashSync(password, 10);
        //const hashpassword = sc.encrypt(password, 10);
        let register = new User(name, hashpassword, email);
        let count = await User.checkEmail(email);
        console.log(email);
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
        let count = await User.checkEmail(email);
        if (count[0].length == 0) {
            res.status(404).json({ message: "User Not Found" });
        }
        else {

            const hashedpassword = await User.getPassword(email);
            const newHashedPassword = hashedpassword[0];
            var stringObj = JSON.stringify(newHashedPassword);

            stringObj = stringObj.substring(14, stringObj.length - 3);
            
            // session.email = email;
          
  
            if (await bcrypt.compare(password, stringObj)) {
                console.log("---------> Login Successful")
                // res.send(`${email} is logged in!`);
                res.render("profilepage");
    
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
    res.render("main");
}



// exports.register = async (req, res, next) => {
//     try {
//         //parse json
//         let {name, email, password} = req.body;
//         //TODO server-side validation here
//         if(!checkUsername(username)){
//             req.flash('error',"invalid username!!!");
//             req.session.save(err => {
//                 res.redirect("/registration");
//         });
//         }else if(!checkEmail(email)){
//             req.flash('error',"invalid Email!!!");
//             req.session.save(err => {
//                 res.redirect("/registration");
//         });
            
//         }else if(!checkPassword(password)){
//             req.flash('error', "Password must be at least8 characters long, contains Upper and lower case characters, and a special character");
//             req.session.save(err => {
//                 res.redirect("/registration");
//             })
    
//         }else if (password != cpassword){
//             req.flash('error', "password did not match");
//             req.session.save(err => {
//                 res.redirect("/registration");
//         });
//         }else{
//             next();
//         }

//         register = await User.register(name, email, password);

//         res.status(201).json({ message: "User created "});
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