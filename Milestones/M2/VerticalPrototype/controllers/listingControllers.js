const Listing = require('../model/Listing');

exports.getAllUsers = async (req, res, next) => {
    try {
        const [listing, _] = await Listing.findAll();

        res.status(200).json({ count: listing.length, listing });
    } catch (error) {
        console.log(error);
        next(error);
    }

}

exports.createNewUser = async (req, res, next) => {
    try {
        let { landlord_id, price, description, street_num, street, city, state, zipcode, room_num, bath_num, picture } = req.body;
        let listing = new Listing(landlord_id, price, description, street_num, street, city, state, zipcode, room_num, bath_num, picture);

        listing = await listing.save();

        res.status(201).json({ message: "Listing created " });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getListing = async(req, res, next) => {
    try {
        let results = req.params.id;
        if(results && results.length) {
            let listing = results[0];
            listing = "To be implemented";
            res.status(200).json(listing);
        } else {
            console.log("Cannot find listing"); //should be 404
            //req.flash('error', 'This is not the post you are looking for');
            res.redirect('/');
        }
    } catch(err) {
        console.log(error);
        next(err);
    }
}

exports.getListBySearch = async (req, res, next) => {
    let search = req.params.search;
    let temp = search.split(" ");
    if (temp.length > 5) {
        try {
            let address = search;
            let [listing, _] = await Listing.getListByAddress(address);

            res.status(200).json({ listing });
        } catch (error) {
            console.log(error);
            next(error);
        }
        return;
    }
    
    if ((isNaN(search))) {
        try {
            let city = search;
            let [listing, _] = await Listing.getListByCity(city);
            if (listing.length == 0) {
                try {
                    let zipcode = search;
                    let [listing, _] = await Listing.findAll(zipcode);

            
                    res.status(200).json({listing});
                } catch (error) {
                    console.log(error);
                    next(error);
                }
            }

            res.status(200).json({ listing });
        } catch (error) {
            console.log(error);
            next(error);
        }
    } else {
        try {
            let zipcode = search;
            let [listing, _] = await Listing.getListByZipcode(zipcode);
            if (listing.length == 0) {
                try {
                    let zipcode = search;
                    let [listing, _] = await Listing.findAll(zipcode);

            
                    res.status(200).json({listing});
                } catch (error) {
                    console.log(error);
                    next(error);
                }
            }

            res.status(200).json({ listing });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

}