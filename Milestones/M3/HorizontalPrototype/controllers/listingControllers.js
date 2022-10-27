const Listing = require('../model/Listing');

exports.getAllListings = async (req, res, next) => {
    try {
        const [listing, _] = await Listing.findAll();

        res.status(200).json({ count: listing.length, listing });
    } catch (error) {
        console.log(error);
        next(error);
    }

}

exports.createNewListing = async (req, res, next) => {
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

//TODO
/*  search algorithm
    check empty search
    if address format
        split address
        if listing appears set first listing
    split search
    12345 abc st sf ca 94588
    12345
    if one item
        if number
            if 5 digits
                search zip code OR st#
            else search st#
        else
            if 2 letters
                get city or state from map
                search city OR state
            else
                search street OR city OR state
                search street
 */
exports.searchListings = async (req, res, next) => {
    let search = req.query.search;
    if (!search) {
        res.send({
            resultsStatus: "info",
            message: "No search term given",
            results: []
        });
    } else {
        let results = await PostModel.search(searchTerm);
        if (results.length) {
            req.flash('success', `${results.length} result${results.length == 1 ? `` : `s`} found`);
            res.locals.results = results;
            results.forEach(row => {
                row.thumbnail = "../" + row.thumbnail;
            });
            res.render('index', { title: "PhotoBase " + searchTerm, header: "Results" });
        } else {
            errorPrint('no results');
            req.flash('error', 'No results were found for your search');
            res.redirect('/');
        }
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