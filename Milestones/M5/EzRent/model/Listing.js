const db = require('../database/db');
// var express = require ('express');
// var router = express.Router();
// var sharp = require ('sharp');
// var multer = require ('multer');

class Register {
    constructor(landlord_id, street_num, street_name, city, state, zipcode, description, bed, bath, price) {
        this.landlord_id = landlord_id;
        this.street_num = street_num;
        this.street_name = street_name;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.description = description;
        this.bed = bed;
        this.bath = bath;
        this.price = price;
    }

    save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1 ;
        let dd = d.getDay();

        let createdAtDate = `${yyyy}-${mm}-${dd }`; 

        let sql = `
        INSERT INTO listing(
            landlord_fk,
            street_number, 
            street, 
            city, 
            state, 
            zip_code, 
            description,
            beds, 
            baths,
            price, 
            time_created
            
        )
        VALUES (
            '${this.landlord_id}',
            '${this.street_num}',
            '${this.street_name}',
            '${this.city}',
            '${this.state}',
            '${this.zipcode}',
            '${this.description}',
            '${this.bed}',
            '${this.bath}',
            '${this.price}',
            '${createdAtDate}'
        )
        `;

        return db.execute(sql);  
 
    }

    static checkEmail(email) {
        let sql = `SELECT reg_user_id, email FROM registeredUser WHERE email = '${email}';`;
        return db.execute(sql);
    }
    
    static checkIfPic(listing_id){
        let sql = `SELECT * FROM ListingPicture WHERE listing_fk = ${listing_id};`
        return db.execute(sql);
    }

    static getListingIdwithPic(listing_id){
        let sql = `SELECT *  FROM Listing l JOIN Picture p JOIN ListingPicture lp ON lp.listing_fk = l.listing_id AND lp.picture_fk = p.picture_id WHERE listing_id = ${listing_id};`
        return db.execute(sql);
    }

    static getListingId(reg_user_id, street_num){
        let sql = `SELECT * FROM listing WHERE landlord_fk = ${reg_user_id} AND street_number = ${street_num};`
        return db.execute(sql);
    }
    static getListingById(listing_id)
    {
        let sql = `SELECT * FROM Listing WHERE listing_id = ${listing_id};`
        return db.execute(sql);
    }

    static async search(search, filters, sorting) {
        let response = {};
        response.results = [];
        response.search = search;
        response.filters = filters;
        response.sorting = sorting;
        response.message = "";
        let splitSearch = search.split(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]/);
        let filtersSQL = ``;
        if(filters) {
            if(filters.min !== undefined || filters.min != null) filtersSQL += `AND price >= ${filters.min}`;
            if(filters.max !== undefined || filters.max != null) filtersSQL += `AND price <= ${filters.max}`;
            if(filters.beds !== undefined || filters.beds != null) filtersSQL += `AND beds >= ${filters.beds}`;
            if(filters.baths !== undefined || filters.baths != null) filtersSQL += `AND baths >= ${filters.baths}`;
            if(filters.rating !== undefined || filters.rating != null) filtersSQL += `AND rating >= ${filters.rating}`;
        }
        let sortSQL = ``;
        if(sorting) {
            if(sorting) {
                sortSQL = ` ORDER BY ${sorting.parameter}`;
                if(sorting.order == 'ascending') sortSQL += ` ASC`;
                else sortSQL += ` DESC`;
            }
        }
        const searchBase = `SELECT listing_id AS 'listingId', price, street_number AS 'streetNumber', street, city,
            state, address_line_2 AS 'addressLine2', zip_code AS 'zipCode', address,
            rating, num_reviews AS 'numReviews', Listing.time_created AS 'timeCreated'
            FROM Listing
            JOIN RegisteredUser
            ON Listing.landlord_fk = RegisteredUser.reg_user_id
            LEFT JOIN ListingPicture
            ON Listing.listing_id = ListingPicture.listing_fk
            LEFT JOIN Picture
            ON ListingPicture.picture_fk = Picture.picture_id`
        let searchSQL = searchBase +
            ` WHERE Listing.address LIKE '%${search}%'
            ${filtersSQL}
            ${sortSQL};`;
        await db.execute(searchSQL).then(result => {
            response.results = response.results.concat(result[0]);
            console.log("Listing model: "+JSON.stringify(result[0]));
            console.log("All results 1: "+JSON.stringify(response.results));
        });
        //if user provides multiple terms
        if(response.results.length > 0) {
            return response;
        }
        for(const searchItem of splitSearch) {
            if(isNaN(searchItem)) {
                searchSQL = searchBase +
                    ` WHERE Listing.address LIKE '%${searchItem}%'
                    ${filtersSQL}
                    ${sortSQL};`;
                await db.execute(searchSQL).then(result => {
                    response.results = response.results.concat(result[0]);
                });
            } else {
                searchSQL = searchBase +
                    ` WHERE Listing.zip_code LIKE '%${searchItem}%'
                    ${filtersSQL}
                    ${sortSQL};`;
                await db.execute(searchSQL).then(result => {
                    response.results = response.results.concat(result[0]);
                });
                searchSQL = searchBase +
                    `WHERE Listing.street_number LIKE '%${searchItem}%'
                    ${filtersSQL}
                    ${sortSQL};`;
                await db.execute(searchSQL).then(result => {
                    response.results = response.results.concat(result[0]);
                });
            }
        }
        if(response.results.length == 0) {
            response.message = "No results found for your query. Try broadening your search";
            if(filters) {
                response.message += " or try reducing your filters";
            }
            response.message += ".";
            searchSQL = searchBase +
                ` WHERE Listing.address LIKE '%San Francisco%'`;
            console.log("SEARCHSQL: "+searchSQL);
            await db.execute(searchSQL).then(result => {
                response.results = response.results.concat(result[0]);
                console.log("All results 5: "+JSON.stringify(response.results));
            });

        }
        return response;
    }

    static getListByZipcode(zipcode) {
        let sql = `SELECT * FROM listing WHERE zip_code LIKE '${zipcode}' OR street_number LIKE '${zipcode}';`;

        return db.execute(sql); 
    }

    static getListByCity(city) {
        let sql = `SELECT * FROM listing WHERE city LIKE '%${city}%' OR street LIKE '%${city}%';`;
        
        return db.execute(sql); 
    }

    static getListByAddress(city) {
        let sql = `SELECT * FROM listing WHERE address LIKE '%${city}%';`;
        
        return db.execute(sql); 
    }

    static findAll() {
        let sql = `SELECT * FROM listing WHERE listing_id BETWEEN '0' AND '7';`;

        return db.execute(sql); 
    }

<<<<<<< Updated upstream
    static async getListingById(id) {
        let listing = {};
        let propertySQL = `SELECT listing_id AS 'listingId', full_name AS 'landlordName', Landlord.rating AS 'landlordRating',
            bio, phone, email, file_name AS 'profile', price, description, address, beds, baths,
            size, pets, type, Listing.rating AS 'listingRating', Listing.time_created AS 'timeCreated'
            FROM Listing
            JOIN RegisteredUser
            ON Listing.landlord_fk = RegisteredUser.reg_user_id
            JOIN Landlord
            ON RegisteredUser.reg_user_id = Landlord.reg_user_fk
            LEFT JOIN Picture
            ON RegisteredUser.profile_picture_fk = Picture.picture_id
            WHERE listing_id = ${id};`;
        db.execute(propertySQL).then(result => {
            listing.property = result[0][0];
            console.log("Model property: "+JSON.stringify(listing.property));
        });
        let reviewsSQL = `SELECT review_id AS 'reviewId', full_name AS 'authorName', rating, title, description,
            Review.time_created AS 'timeCreated'
            FROM Review
            JOIN ListingReview
            ON Review.review_id = ListingReview.review_fk
            JOIN RegisteredUser
            ON Review.author_fk = RegisteredUser.reg_user_id
            WHERE ListingReview.listing_fk = ${id};`;
        db.execute(reviewsSQL).then(result => {
            listing.reviews = result[0];
            console.log("Model reviews: "+JSON.stringify(listing.reviews));
        });
        let picturesSQL = `SELECT picture_id AS 'pictureId', file_name AS 'fileName'
            FROM ListingPicture
            JOIN Picture
            WHERE ListingPicture.listing_fk = ${id};`
        db.execute(picturesSQL).then(result => {
            listing.pictures = result[0];
            console.log("Model pictures: "+JSON.stringify(listing.pictures));
        });
        return listing;
    }
=======
    // static getListingById(id) {
    //     let listing = {};
    //     let propertySQL = `SELECT listing_id AS 'listingId', full_name AS 'landlordName', price, description,
    //         address, beds, baths, size, pets, type, rating, Listing.time_created AS 'timeCreated'
    //         FROM Listing
    //         JOIN RegisteredUser
    //         ON Listing.landlord_fk = RegisteredUser.reg_user_id
    //         WHERE listing_id = ${id};`;
    //     listing.property = db.execute(propertySQL)[0];
    //     let reviewsSQL = `SELECT review_id AS 'reviewId', full_name AS 'authorName', rating, title, description,
    //         Review.time_created AS 'timeCreated'
    //         FROM Review
    //         JOIN ListingReview
    //         ON Review.review_id = ListingReview.review_fk
    //         JOIN RegisteredUser
    //         ON Review.author_fk = RegisteredUser.reg_user_id
    //         WHERE ListingReview.listing_fk = ${id};`;
    //     listing.reviews = db.execute(reviewsSQL)[0];
    //     return listing;
    // }
>>>>>>> Stashed changes

}

module.exports = Register;