const db = require('../database/db');

class Register {
    constructor(landlord_id, price, description, street_num, street, city, state, zipcode, room_num, bath_num, picture) {
        this.landlord_id = landlord_id;
        this.price = price;
        this.description = description;
        this.street_num = street_num;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.room_num = room_num;
        this.bath_num = bath_num;
        this.picture = picture;
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
            price, 
            description, 
            street_number, 
            street, 
            city, 
            state, 
            zipcode, 
            num_room, 
            num_bath,
            time_created,
            picture
        )
        VALUES (
            '${this.landlord_id}',
            '${this.price}',
            '${this.description}',
            '${this.street_num}',
            '${this.street}',
            '${this.city}',
            '${this.state}',
            '${this.zipcode}',
            '${this.room_num}',
            '${this.bath_num}',
            '${createdAtDate}',
            '${this.picture}' 
        )
        `;

        return db.execute(sql);  
 
    }

    static findAll() {
        let sql = `SELECT * FROM listing;`;

        return db.execute(sql); 
    }

}

module.exports = Register;