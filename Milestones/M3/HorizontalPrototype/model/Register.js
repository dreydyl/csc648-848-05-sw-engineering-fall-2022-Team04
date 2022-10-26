const db = require('../database/db');

class Register {
    constructor(name, email, password, role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1 ;
        let dd = d.getDay();

        let createdAtDate = `${yyyy}-${mm}-${dd }`; 

        let sql = `
        INSERT INTO registeredUser(
            name,
            email,
            password,
            created_at,
            role
        )
        VALUES (
            '${this.name}',
            '${this.email}',
            '${this.password}',
            '${createdAtDate}',
            '${this.rating}' 
        )
        `;

        return db.execute(sql);  
 
    }

    static findAll() {
        let sql = `SELECT * FROM registeredUser;`;

        return db.execute(sql); 
    }

}

module.exports = Register;