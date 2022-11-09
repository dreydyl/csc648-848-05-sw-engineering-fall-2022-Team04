const User = require('../model/User');

exports.getAllUsers =  async  (req, res, next ) => {
    try {
        const [registeredUser, _] = await Register.getAll();
        
        res.status(200).json({count: registeredUser.length, registeredUser}); 
    } catch (error) {
        console.log(error);
        next(error);  
    }
}
const checkUsername = (username) => {

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
    

exports.register = async (req, res, next) => {
    try {
        //parse json
        let {name, email, password} = req.body;
        //TODO server-side validation here
        if(!checkUsername(username)){
            req.flash('error',"invalid username!!!");
            req.session.save(err => {
                res.redirect("/registration");
        });
        }else if(!checkEmail(email)){
            req.flash('error',"invalid Email!!!");
            req.session.save(err => {
                res.redirect("/registration");
        });
            
        }else if(!checkPassword(password)){
            req.flash('error', "Password must be at least8 characters long, contains Upper and lower case characters, and a special character");
            req.session.save(err => {
                res.redirect("/registration");
            })
    
        }else if (password != cpassword){
            req.flash('error', "password did not match");
            req.session.save(err => {
                res.redirect("/registration");
        });
        }else{
            next();
        }

        register = await User.register(name, email, password);

        res.status(201).json({ message: "User created "});
    } catch (error) {
        console.log(error);
        next(error);   
    }
}

//TODO
exports.login = async (req, res, next) => {
    //use sessions
}

//TODO
exports.getFeaturedLandlords = async (req, res, next) => {
    let search = req.params.search;
    try {
        let results = await User.getFeaturedLandlords();

        console.log(results);

        res.locals.results = results;

        next();
    } catch (error) {
        console.log(error);
        next(error);  
    }
}

exports.getLandlordsBySearch = async (req, res, next) => {
    let search = req.params.search;
    try {
        const [landlord, _] = await User.getLandlordsBySearch();

        console.log(landlord);

        res.locals.results = landlord;

        next();
    } catch (error) {
        console.log(error);
        next(error);  
    }
}