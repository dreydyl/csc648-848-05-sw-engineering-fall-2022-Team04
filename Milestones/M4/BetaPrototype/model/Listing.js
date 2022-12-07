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

    static search(search, filters, sorting) { //TODO
        let sql = `SELECT * FROM listing WHERE listing_id BETWEEN '0' AND '7';`;
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