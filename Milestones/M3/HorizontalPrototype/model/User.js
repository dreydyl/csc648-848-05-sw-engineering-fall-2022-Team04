const db = require('../database/db');
const UserModel = {};

/**TODO
 * takes in a string
 * hashes
 * returns hash value
 */
function encrypt(password) {
    return password; //delete this line of code
    //return encryptedPassword;
}

/**
 * takes in a string and a hash value
 * hashes string
 * returns true if hash values are the same
 * returns false if the hash values are different
 */
function compare(password, hash) {
    return (encrypt(password) == hash);
}

UserModel.verifyPassword = (id, password) => {
    let sql = "SELECT password FROM registeredUser WHERE reg_user_id=?;";
    return db.execute(sql, [id])
    .then(([results, fields]) => {
        if(results && results.length == 1) {    //check database returned anything
            id = results[0].id;                 //get the user id from the results
            return compare(password, results[0].password);
        } else {
            return Promise.reject(-1);          //rejects if not exactly one result
        }
    })
    .then((passwordsMatched) => {
        if(passwordsMatched) {
            return Promise.resolve(id);
        } else {
            return Promise.resolve(-1);
        }
    })
    .catch((err) => Promise.reject(err));
}

UserModel.register = (name, email, password) => {
    //set date to current date
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1 ;
    let dd = d.getDay();

    let createdAtDate = `${yyyy}-${mm}-${dd }`; 

    //encrypt password for security
    let encryptedPassword = encrypt(password);

    let sql = `
        INSERT INTO registeredUser(
            name,
            email,
            password,
            created_at
        )
        VALUES (?, ?, ?, ?)
        `;

    //execute with security measures
    return db.execute(sql, [
        name,
        email,
        encryptedPassword,
        createdAtDate
    ]);
}

UserModel.emailExists = (email) => {            //check if email exists in database
    return db.execute("SELECT * FROM users WHERE email=?", [email])
    .then(([results, fields]) => {
        return Promise.resolve(!(results && results.length == 0));
    })
    .catch((err) => Promise.reject(err));
}

UserModel.authenticate = (email, password) => {
    let sql = "SELECT reg_user_id, email, password FROM registeredUser WHERE email=?;";
    let userId;
    return db.execute(sql, [email])
    .then(([results, fields]) => {
        if(results && results.length == 1) {    //check database returned anything
            userId = results[0].id;             //get the user id from the results
            return compare(password, results[0].password);
        } else {
            return Promise.reject(-1);          //rejects if not exactly one result
        }
    })
    .then((passwordsMatched) => {
        if(passwordsMatched) {
            return Promise.resolve(userId);
        } else {
            return Promise.resolve(-1);
        }
    })
    .catch((err) => Promise.reject(err));
}

//get reg_user_id and add it to landlord table
//TODO update registeredUser table to set role to landlord
UserModel.registerLandlord = (id) => {
    let sql = `
        INSERT INTO landlord (landlord_id)
        VALUES (?)
    `;

    return db.execute(sql, [id]);
}

//TODO Get top three landlords by rating
UserModel.getFeaturedLandlords = () => {
    //get all landlords
    //sort them
    //get only 3
    let sql = `
        SELECT * FROM landlord;
    `;
    
    //return db.execute(sql);
}

//TODO Get landlords that match search
UserModel.getLandlordsBySearch = (search, filters) => {
    //get landlords that match
    //apply filters
    //sort them
    let sql = `
        SELECT * FROM registeredUser
    `;
    
    return db.execute(sql);
}

module.exports = UserModel;