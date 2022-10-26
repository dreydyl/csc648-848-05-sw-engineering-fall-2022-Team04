const Register = require('../model/Register');

exports.getAllUsers =  async  (req, res, next ) => {
    try {
        const [registeredUser, _] = await Register.findAll();
        
        res.status(200).json({count: registeredUser.length, registeredUser}); 
    } catch (error) {
        console.log(error);
        next(error);  
    }

 }

 exports.createNewUser = async (req, res, next) => {
    try {
        let {name, email, password, role} = req.body;
        let register = new Register(name, email, password, role);

        register = await register.save();

        res.status(201).json({ message: "User created "});
    } catch (error) {
        console.log(error);
        next(error);   
    }

 }