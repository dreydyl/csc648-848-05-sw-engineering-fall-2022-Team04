const Listing = require('../model/Listing');
const Picture = require('../model/Picture');
const Register = Picture.Register;
const Picture_Listing = Picture.Picture_Listing;
const zlib = require('zlib'); 


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
    // let fileUploaded = req.file.path;
    // let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    // let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let count = await Listing.checkEmail(req.session.email);
    let userId = count[0][0].reg_user_id;
    let landlord_id = userId;
    let {street_num, street_name, city, state, zipcode, description, bed, bath, price } = req.body;
    let listing = new Listing(landlord_id, street_num, street_name, city, state, zipcode, description, bed, bath, price);
    let {name, data} = req.files.pic;
    const zip = zlib.gzipSync(JSON.stringify(data)).toString('base64');
    let pic = new Register(name, zip);
    listing = await listing.save();
    pic = await pic.save();
    let getListingId = await Listing.getListingId(userId, street_num);
    let listingId = getListingId[0][0].listing_id;
    let getPicId = await Picture_Listing.getPic(name);
    let picId = getPicId[0][0].picture_id;
    let picList = new Picture_Listing(picId, listingId);
    picList = await picList.save();
    res.status(200).json({message: "Posted"});

    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getListing = async (req, res, next) => {
    try {
        let id = req.params.id;
        let listing = await Listing.getListingById(id);
        
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
    console.log(search);
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
                if (req.session.admin) {
                    res.locals.logged = true;
                }
                res.render('listingResults', { title: "EZRent " + search, header: "Results" });
            } else {
                console.log("no results");
                if (req.session.admin) {
                    res.locals.logged = true;
                }
                res.render('listingResults', { title: "EZRent " + search, header: "Results" });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

exports.applyFilters = async (req, res, next) => {
    //url example /search?search=&min=&max=&rating=&beds=&baths=
    let search = req.query.search;
}

// exports.getListBySearch = async (req, res, next) => {
//     let search = req.params.search;
//     let temp = search.split(" ");
//     if (temp.length > 5) {
//         try {
//             let address = search;
//             let [listing, _] = await Listing.getListByAddress(address);

//             res.status(200).json({ listing });
//         } catch (error) {
//             console.log(error);
//             next(error);
//         }
//         return;
//     }

//     if ((isNaN(search))) {
//         try {
//             let city = search;
//             let [listing, _] = await Listing.getListByCity(city);
//             if (listing.length == 0) {
//                 try {
//                     let zipcode = search;
//                     let [listing, _] = await Listing.findAll(zipcode);

//                     res.status(200).json({ listing });
//                 } catch (error) {
//                     console.log(error);
//                     next(error);
//                 }
//             }

//             res.status(200).json({ listing });
//         } catch (error) {
//             console.log(error);
//             next(error);
//         }
//     } else {
//         try {
//             let zipcode = search;
//             let [listing, _] = await Listing.getListByZipcode(zipcode);
//             if (listing.length == 0) {
//                 try {
//                     let zipcode = search;
//                     let [listing, _] = await Listing.findAll(zipcode);

//                     res.status(200).json({ listing });
//                 } catch (error) {
//                     console.log(error);
//                     next(error);
//                 }
//             }

//             res.status(200).json({ listing });
//         } catch (error) {
//             console.log(error);
//             next(error);
//         }
//     }

// }