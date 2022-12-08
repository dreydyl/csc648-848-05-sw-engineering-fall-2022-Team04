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
            landlord_id,
            street_num, 
            street_name, 
            city, 
            state, 
            zipcode, 
            description,
            bed, 
            bath,
            price, 
            created_at
            
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
        let sql = `SELECT * FROM listing WHERE landlord_id = ${reg_user_id} AND street_num = ${street_num};`
        return db.execute(sql);
    }

    static search(search, filters, sorting) {
        let results = [];
        let splitSearch = search.split(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]/);
        let filtersSQL = ``;
        if(filters.min) filtersSQL += `AND price >= ${filters.beds}`;
        if(filters.max) filtersSQL += `AND price <= ${filters.beds}`;
        if(filters.beds) filtersSQL += `AND beds >= ${filters.beds}`;
        if(filters.baths) filtersSQL += `AND baths >= ${filters.baths}`;
        if(filters.rating) filtersSQL += `AND rating >= ${filters.rating}`;
        let sortSQL = ``;
        if(sorting) {
            sortSQL = `ORDER BY ${sorting.parameter}`;
            if(sorting.order == 'ascending') sortSQL += ` ASC`;
            else sortSQL += ` DESC`;
        }
        const searchBase = `SELECT listing_id AS 'listingId', price, street_number AS 'streetNumber', street, city,
            state, address_line_2 AS 'addressLine2', zip_code AS 'zipCode', address,
            rating, num_reviews AS 'numReviews', time_created AS 'timeCreated'
            FROM Listing
            JOIN RegisteredUser
            ON Listing.landlord_fk = RegisteredUser.reg_user_id
            JOIN ListingPicture
            ON Listing.listing_id = ListingPicture.listing_fk
            JOIN Picture
            ON ListingPicture.picture_fk = Picture.picture_id`
        let searchSQL = searchBase +
            `WHERE Listing.address LIKE '%${search}%'
            ${filtersSQL}
            ${sortSQL};`;
        results.concat(db.execute(searchSQL)[0]);
        for(const searchItem of splitSearch) {
            if(isNaN(searchItem)) {
                searchSQL = searchBase +
                    `WHERE Listing.address LIKE '%${searchItem}%'
                    ${filtersSQL}
                    ${sortSQL};`;
                results.concat(db.execute(searchSQL)[0]);
            } else {
                searchSQL = searchBase +
                    `WHERE Listing.zip_code LIKE '%${searchItem}%'
                    ${filtersSQL}
                    ${sortSQL};`;
                results.concat(db.execute(searchSQL)[0]);
                searchSQL = searchBase +
                    `WHERE Listing.street_number LIKE '%${searchItem}%'
                    ${filtersSQL}
                    ${sortSQL};`;
                results.concat(db.execute(searchSQL)[0]);
            }
        }
        return db.execute(sql);
    }

    static getListByZipcode(zipcode) {
        let sql = `SELECT * FROM listing WHERE zipcode LIKE '${zipcode}' OR street_number LIKE '${zipcode}';`;

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
        let sql = `SELECT * FROM posts WHERE listing_id=${id}`;
        return db.execute(sql);
    }

}

module.exports = Register;