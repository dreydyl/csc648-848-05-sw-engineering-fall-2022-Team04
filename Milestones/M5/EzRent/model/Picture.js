const db = require('../database/db');

class Register {
    constructor(name, img){
        this.name = name;
        this.img = img;
    }

    save()
    {
        let sql = `
            INSERT INTO picture (file_name, img_path)
            VALUE (
                '${this.name}',
                '${this.img}'
            )    
        `
        return db.execute(sql);
    }
}
class Picture_Listing {
    constructor(picture_id, listing_id){
        this.picture_id = picture_id;
        this.listing_id = listing_id;
    }
    save()
    {
        let sql = `
            INSERT INTO ListingPicture (picture_fk, listing_fk)
            VALUE (
                ${this.picture_id},
                ${this.listing_id}
            )
        `
        return db.execute(sql);
    }
    static getPic(name){
        let sql = `SELECT * FROM picture WHERE file_name = '${name}';`
        return db.execute(sql);
    }
}

module.exports = { Register, Picture_Listing};