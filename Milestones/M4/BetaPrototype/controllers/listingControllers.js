const Listing = require('../model/Listing');
var flash = require('express-flash');

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
        
        // let { landlord_id, street_num, street_name, city, state, zipcode, description, bed, bath, price, file_name, rating } = req.params;
        // let listing = new Listing(landlord_id, street_num, street_name, city, state, zipcode, description, bed, bath, price, file_name, rating);

        // listing = await listing.save();

        //TODO: modify to match db
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let email = req.body.email;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userId;
    sharp(fileUploaded)
    .resize(200)
    .toFile(destinationOfThumbnail)
    .then(() => {
        return Listing.save(
            title,
            description,
            fileUploaded,
            email,
            destinationOfThumbnail,
            fk_userId,
            //TODO
        );
    })
    .then((postWasCreated) => {
        if(postWasCreated){
            res.send("Your post was created successfully!!");
            req.flash('success', 'Your post was created successfully!!')
            res.redirect("/");
        }else{
            // throw new PostError ('Post could not be created!!', '/postimage', 200);
            res.send("your post can't be posted");
            req.flash('error', 'unable to post');
        }
    })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getListing = async (req, res, next) => {
    try {
        let results = req.params.id;
        if (results && results.length) {
            let listing = results[0];
            listing = "To be implemented";
            res.status(200).json(listing);
        } else {
            console.log("Cannot find listing"); //should be 404
            //req.flash('error', 'This is not the post you are looking for');
            res.redirect('/');
        }
    } catch (err) {
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
    res.locals.searchTerm = search;
    if (!search) {
        res.locals.error = "No search term given";
        res.render('error', { title: "EZRent " });
    } else {
        try {
            //let results = await Listing.search(search);
            let results = {
                "listing1": {
                    "id": "0",
                    "landlord": "Bob John",
                    "price": "40,000",
                    "description": "Basically a resort",
                    "street_number": "1234",
                    "street": "Fall Street",
                    "city": "Stockton",
                    "state": "CA",
                    "zip": "94545",
                    "rooms": 2,
                    "baths": 1,
                    "top_review": {
                        "title": "Love it",
                        "rating": 5,
                        "author": "Staniel Chaniel",
                        "description": "Love this place"
                    }
                },
                "listing2": {
                    "id": "1",
                    "landlord": "John Bob",
                    "price": "12,000",
                    "description": "Cool place",
                    "street_number": "1234",
                    "street": "Span Avenue",
                    "city": "Hayward",
                    "state": "CA",
                    "zip": "94545",
                    "rooms": 4,
                    "baths": 3,
                    "top_review": {
                        "title": "Beautiful",
                        "rating": 5,
                        "author": "Dennis Dennis",
                        "description": "There's a nice view"
                    }
                },
                "listing3": {
                    "id": "2",
                    "landlord": "Job Bohn",
                    "price": "50,000",
                    "description": "Perfect for family",
                    "street_number": "1234",
                    "street": "Ballast Court",
                    "city": "San Francisco",
                    "state": "CA",
                    "zip": "94545",
                    "rooms": 4,
                    "baths": 2,
                    "top_review": {
                        "title": "Wowow",
                        "rating": 4,
                        "author": "Alonzo Aball",
                        "description": "My family loves this place"
                    }
                }
            };
            if (results) {
                res.locals.results = results;
                res.render('listingResults', { title: "EZRent " + search, header: "Results" });
            } else {
                console.log("no results");
                res.render('listingResults', { title: "EZRent " + search, header: "Results" });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

exports.applyFilters = async (req, res, next) => {
    let search = req.query.search;
    let rating = req.query.rating;
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

                    res.status(200).json({ listing });
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

                    res.status(200).json({ listing });
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