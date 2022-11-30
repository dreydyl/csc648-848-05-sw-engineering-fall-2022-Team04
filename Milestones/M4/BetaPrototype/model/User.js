const db = require('../database/db');
// const UserModel = {};

// /**TODO
//  * takes in a string
//  * hashes
//  * returns hash value
//  */
// function encrypt(password) {
//     return password; //delete this line of code
//     //return encryptedPassword;
// }

// /**
//  * takes in a string and a hash value
//  * hashes string
//  * returns true if hash values are the same
//  * returns false if the hash values are different
//  */
// function compare(password, hash) {
//     return (encrypt(password) == hash);
// }

// UserModel.verifyPassword = (id, password) => {
//     let sql = "SELECT password FROM registeredUser WHERE reg_user_id=?;";
//     return db.execute(sql, [id])
//     .then(([results, fields]) => {
//         if(results && results.length == 1) {    //check database returned anything
//             id = results[0].id;                 //get the user id from the results
//             return compare(password, results[0].password);
//         } else {
//             return Promise.reject(-1);          //rejects if not exactly one result
//         }
//     })
//     .then((passwordsMatched) => {
//         if(passwordsMatched) {
//             return Promise.resolve(id);
//         } else {
//             return Promise.resolve(-1);
//         }
//     })
//     .catch((err) => Promise.reject(err));
// }

// UserModel.register = (name, email, password) => {
//     //set date to current date
//     let d = new Date();
//     let yyyy = d.getFullYear();
//     let mm = d.getMonth() + 1 ;
//     let dd = d.getDay();

//     let createdAtDate = `${yyyy}-${mm}-${dd }`; 

//     //encrypt password for security
//     let encryptedPassword = encrypt(password);

//     let sql = `
//         INSERT INTO registeredUser(
//             name,
//             email,
//             password,
//             created_at
//         )
//         VALUES (?, ?, ?, ?)
//         `;

//     //execute with security measures
//     return db.execute(sql, [
//         name,
//         email,
//         encryptedPassword,
//         createdAtDate
//     ]);
// }

// UserModel.emailExists = (email) => {            //check if email exists in database
//     return db.execute("SELECT * FROM users WHERE email=?", [email])
//     .then(([results, fields]) => {
//         return Promise.resolve(!(results && results.length == 0));
//     })
//     .catch((err) => Promise.reject(err));
// }

// UserModel.authenticate = (email, password) => {
//     let sql = "SELECT reg_user_id, email, password FROM registeredUser WHERE email=?;";
//     let userId;
//     return db.execute(sql, [email])
//     .then(([results, fields]) => {
//         if(results && results.length == 1) {    //check database returned anything
//             userId = results[0].id;             //get the user id from the results
//             return compare(password, results[0].password);
//         } else {
//             return Promise.reject(-1);          //rejects if not exactly one result
//         }
//     })
//     .then((passwordsMatched) => {
//         if(passwordsMatched) {
//             return Promise.resolve(userId);
//         } else {
//             return Promise.resolve(-1);
//         }
//     })
//     .catch((err) => Promise.reject(err));
// }

// //get reg_user_id and add it to landlord table
// //TODO update registeredUser table to set role to landlord
// UserModel.registerLandlord = (id) => {
//     let sql = `
//         INSERT INTO landlord (landlord_id)
//         VALUES (?)
//     `;

//     return db.execute(sql, [id]);
// }

// //TODO Get top three landlords by rating
// UserModel.getFeaturedLandlords = () => {
//     //get all landlords
//     //sort them
//     //get only 3
//     let sql = `
//         SELECT * FROM landlord;
//     `;
    
//     //return db.execute(sql);
// }

// //TODO Get landlords that match search
// UserModel.getLandlordsBySearch = (search, filters) => {
//     //get landlords that match
//     //apply filters
//     //sort them
//     let sql = `
//         SELECT * FROM registeredUser
//     `;
    
//     return db.execute(sql);
// }

// module.exports = UserModel;



class Register {
    constructor(firstName, lastName, password, email, role){
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1 ;
        let dd = d.getDay();

        let createdAtDate = `${yyyy}-${mm}-${dd }`; 

        let sql = `
            INSERT INTO registeredUser (
                firstName,
                lastName,
                password,
                email,
                role,
                created_at
            )
            VALUE (
                '${this.firstName}',
                '${this.lastName}',
                '${this.password}',
                '${this.email}',
                '${this.role}',
                '${createdAtDate}'
            )`;
            
            return db.execute(sql); 

    }
    
    static checkEmail(email){
        let sql = `SELECT email FROM registeredUser WHERE email = '${email}';`;
        return db.execute(sql);
    }
    static getPassword(email){
        let sql = `SELECT password FROM registeredUser WHERE email = '${email}';`;
        return db.execute(sql);
    }
}

class Update{
    constructor(bio, picture, email){
        this.bio = bio;
        this.picture = picture;
        this.email = email;
    }

    update(){
        let sql = `
            UPDATE registeredUser
            SET 
                bio = '${this.bio}',
                picture = '${this.picture}'
            WHERE email = ${this.email};`;
        return db.execute(sql);
    }
}

class Review{
    constructor(reg_user_id, rating, description, referUserId){
        this.reg_user_id = reg_user_id;
        this.rating = rating;
        this.description = description;
        this.referUserId = referUserId;
    }

    save(){
        let sql = `
            INSERT INTO review (reg_user_id, rating, description, referUserId)
            VALUE(
                ${this.reg_user_id},
                ${this.rating},
                '${this.description}',
                ${this.referUserId}
        );`;
        return db.execute(sql);
    }
    
    static getUserbyEmail(email){
        let sql = `SELECT reg_user_id FROM registeredUser WHERE email = '${email}';`;
        return db.execute(sql);
    }
    static getUserbyId(id){
        let sql = `SELECT reg_user_id FROM registeredUser WHERE reg_user_id = ${id};`;
        return db.execute(sql);
    }
    static getProfile(id){
        let sql = `SELECT registeredUser.firstName, registeredUser.lastName, registeredUser.email, registeredUser.bio, registeredUser.picture, registeredUser.user_rating, review.rating, review.description, review.referUserId FROM registeredUser LEFT OUTER JOIN review ON registeredUser.reg_user_id = review.reg_user_id WHERE registeredUser.reg_user_id = ${id};`;
        return db.execute(sql);
    }
    static getUserRating(id){
        let sql = `SELECT rating FROM review LEFT OUTER JOIN registeredUser ON review.referUserId = registeredUser.reg_user_id WHERE review.referUserId = ${id};`;
        return db.execute(sql);
    }
    static getLanlordList(name){
        let sql = `SELECT firstName, lastName, email FROM registeredUser WHERE registeredUser.firstName = '${name}' OR registeredUser.lastName = '${name}' AND registeredUser.role = 'landlord';`;
        return db.execute(sql);
    }
}

class Rating{
    constructor(reg_user_id, user_rating){
        this.reg_user_id = reg_user_id;
        this.user_rating = user_rating;
    }
    update_rating(){
        let sql = `
            UPDATE registeredUser
            SET user_rating = ${this.user_rating}
            WHERE reg_user_id = ${this.reg_user_id};  
        `;
        return db.execute(sql);
    }
}
module.exports = { Register, Update, Review, Rating};