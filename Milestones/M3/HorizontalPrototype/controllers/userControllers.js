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

exports.register = async (req, res, next) => {
    try {
        //parse json
        let {name, email, password} = req.body;
        //TODO server-side validation here

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