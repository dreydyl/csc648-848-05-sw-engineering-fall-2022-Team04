const Listing = require('../model/Listing');

exports.getAllUsers =  async  (req, res, next ) => {
    try {
        const [listing, _] = await Listing.findAll();
        
        res.status(200).json({count: listing.length, listing}); 
    } catch (error) {
        console.log(error);
        next(error);  
    }

 }

 exports.createNewUser = async (req, res, next) => {
    try {
        let {landlord_id, price, description, street_num, street, city, state, zipcode, room_num, bath_num, review_id} = req.body;
        let listing = new Listing(landlord_id, price, description, street_num, street, city, state, zipcode, room_num, bath_num, review_id);

        listing = await listing.save();

        res.status(201).json({ message: "Listing created "});
    } catch (error) {
        console.log(error);
        next(error);   
    }

 }