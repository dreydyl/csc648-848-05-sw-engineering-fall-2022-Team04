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
    
    static getListingId(reg_user_id, street_num){
        let sql = `SELECT * FROM listing WHERE landlord_fk = ${reg_user_id} AND street_number = ${street_num};`
        return db.execute(sql);
    }

    static async search(search, filters, sorting) {
        let results = [];
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
            results = results.concat(result[0]);
            console.log("Listing model: "+JSON.stringify(result[0]));
            console.log("All results 1: "+JSON.stringify(results));
        });
        //if user provides multiple terms
        if(results.length > 0) {
            return results;
        }
        for(const searchItem of splitSearch) {
            if(isNaN(searchItem)) {
                searchSQL = searchBase +
                    ` WHERE Listing.address LIKE '%${searchItem}%'
                    ${filtersSQL}
                    ${sortSQL};`;
                await db.execute(searchSQL).then(result => {
                    results = results.concat(result[0]);
                });
            } else {
                searchSQL = searchBase +
                    ` WHERE Listing.zip_code LIKE '%${searchItem}%'
                    ${filtersSQL}
                    ${sortSQL};`;
                await db.execute(searchSQL).then(result => {
                    results = results.concat(result[0]);
                });
                searchSQL = searchBase +
                    `WHERE Listing.street_number LIKE '%${searchItem}%'
                    ${filtersSQL}
                    ${sortSQL};`;
                await db.execute(searchSQL).then(result => {
                    results = results.concat(result[0]);
                });
            }
        }
        return results;
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

    static getListingById(id) {
        let listing = {};
        let propertySQL = `SELECT listing_id AS 'listingId', full_name AS 'landlordName', price, description,
            address, beds, baths, size, pets, type, rating, Listing.time_created AS 'timeCreated'
            FROM Listing
            JOIN RegisteredUser
            ON Listing.landlord_fk = RegisteredUser.reg_user_id
            WHERE listing_id = ${id};`;
        listing.property = db.execute(propertySQL)[0];
        let reviewsSQL = `SELECT review_id AS 'reviewId', full_name AS 'authorName', rating, title, description,
            Review.time_created AS 'timeCreated'
            FROM Review
            JOIN ListingReview
            ON Review.review_id = ListingReview.review_fk
            JOIN RegisteredUser
            ON Review.author_fk = RegisteredUser.reg_user_id
            WHERE ListingReview.listing_fk = ${id};`;
        listing.reviews = db.execute(reviewsSQL)[0];
        return listing;
    }

}

module.exports = Register;