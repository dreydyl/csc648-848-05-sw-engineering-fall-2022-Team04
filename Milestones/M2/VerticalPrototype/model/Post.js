const db = require('../database/db');

class Post {
    constructor(title, body, rating) {
        this.title = title;
        this.body = body;
        this.rating = rating;
    }

    save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1 ;
        let dd = d.getDay();

        let createdAtDate = `${yyyy}-${mm}-${dd }`; 

        let sql = `
        INSERT INTO posts(
            title,
            body,
            created_at,
            rating
        )
        VALUES (
            '${this.title}',
            '${this.body}',
            '${createdAtDate}',
            '${this.rating}' 
        )
        `;

        return db.execute(sql);  
 
    }

    static findAll() {
        let sql = `SELECT * FROM posts WHERE id BETWEEN '3' AND '10';`;

        return db.execute(sql); 
    }

    static findByTitle(title) {
        let sql = `SELECT * FROM posts WHERE title LIKE '%${title}%';`;

        return db.execute(sql); 
    }

}

module.exports = Post;