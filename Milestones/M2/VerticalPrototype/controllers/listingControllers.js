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
        let {landlord_id, price, description, street_num, street, city, state, zipcode, room_num, bath_num, picture} = req.body;
        let listing = new Listing(landlord_id, price, description, street_num, street, city, state, zipcode, room_num, bath_num, picture);

        listing = await listing.save();

        res.status(201).json({ message: "Listing created "});
    } catch (error) {
        console.log(error);
        next(error);   
    }
 }

    exports.getListByZipcode = async (req, res, next) => {
        try {
            let zipcode = req.params.zipcode;
            let [listing, _] = await Listing.getListByZipcode(zipcode);
             
            res.status(200).json({listing});
        } catch (error) {
            console.log(error);  
            next(error);  
        }
    }

    exports.getListByCity = async (req, res, next) => {
        try {
            let city = req.params.city;
            if (typeof city === 'string' || city instanceof String)
            {
                
            }
            else
            {
                let [listing, _] = await Listing.getListByCity(city);
                
            }
            
             
            res.status(200).json({listing});
        } catch (error) {
            console.log(error);  
            next(error);  
        }
    }