/* Models for reviews and comments */

const db = require("../database/db");

class Review {
    constructor(reg_user_id, rating, description, referLandlordId) {
        this.reg_user_id = reg_user_id;
        this.rating = rating;
        this.description = description;
        this.referLandlordId = referLandlordId;
    }

    save() {
        let sql = `
            INSERT INTO review (reg_user_id, rating, description, referLandlordId)
            VALUE(
                ${this.reg_user_id},
                ${this.rating},
                '${this.description}',
                ${this.referLandlordId}
        );`;
        return db.execute(sql);
    }

    static getUserbyEmail(email) {
        let sql = `SELECT reg_user_id FROM registeredUser WHERE email = '${email}';`;
        return db.execute(sql);
    }
    static getUserbyId(id) {
        let sql = `SELECT reg_user_id FROM registeredUser WHERE reg_user_id = ${id};`;
        return db.execute(sql);
    }
    static getRole(id){
        let sql = `SELECT role FROM registeredUser WHERE reg_user_id = ${id};`;
        return db.execute(sql);
    }
    static getLandlordProfile(id){
        let sql = `SELECT firstName, lastName, email, bio, picture, user_rating, role FROM registeredUser WHERE reg_user_id = ${id};`;
        return db.execute(sql);
    }
    static getLandlordRating(id){
        let sql = `SELECT rating FROM review LEFT OUTER JOIN registeredUser ON review.referLandlordId = registeredUser.reg_user_id WHERE review.referLandlordId = ${id} AND registeredUser.role = 'landlord'`;
        return db.execute(sql);
    }
    static getLandlordReview(id){
        let sql = `SELECT registeredUser.firstName, registeredUser.lastName, review.rating, review.description  FROM registeredUser LEFT OUTER JOIN review ON registeredUser.reg_user_id = review.reg_user_id WHERE review.referLandlordId = ${id};`;
        return db.execute(sql);
    }
    static getRenterProfile(id){
        let sql = `SELECT firstName, lastName, email, bio, picture, role FROM registeredUser WHERE reg_user_id = ${id};`;
        return db.execute(sql);
    }
    static getRenterWrittenReview(id){
        let sql = `SELECT registeredUser.firstName, registeredUser.lastName, review.rating, review.description FROM registeredUser LEFT OUTER JOIN review ON registeredUser.reg_user_id = review.referLandlordId WHERE registeredUser.reg_user_id = ${id}`;
        return db.execute(sql);
    }
    static getLanlordList(name){
        let sql = `SELECT firstName, lastName, email FROM registeredUser WHERE registeredUser.firstName = '${name}' OR registeredUser.lastName = '${name}' AND registeredUser.role = 'landlord';`;
        return db.execute(sql);
    }

    static getReview(id) {
        let review = {};
        let reviewSQL = `SELECT review_id AS 'reviewId', author_fk AS 'renterId', author.full_name AS 'renterName',
            Review.rating, title, Review.description, Review.time_created AS 'timeCreated', Review.type,
            listing_fk AS 'listingId', LandlordReview.landlord_fk AS 'landlordId', city, state,
            subject_landlord.full_name AS 'landlordName', file_name AS 'thumbnail'
            FROM Review
            JOIN RegisteredUser author
            ON author.reg_user_id = Review.author_fk
            LEFT JOIN ListingReview
            ON Review.review_id = ListingReview.review_fk
            LEFT JOIN LandlordReview
            ON Review.review_id = LandlordReview.review_fk
            LEFT JOIN Listing
            ON ListingReview.listing_fk = Listing.listing_id
            LEFT JOIN Landlord
            ON LandlordReview.landlord_fk = Landlord.reg_user_fk
            LEFT JOIN RegisteredUser subject_landlord
            ON Landlord.reg_user_fk = subject_landlord.reg_user_id
            LEFT JOIN ReviewPicture
            ON Review.review_id = (SELECT ReviewPicture.review_fk
                FROM ReviewPicture rp
                WHERE Review.review_id = rp.review_fk
                ORDER BY rp.review_fk
                LIMIT 1) 
            LEFT JOIN Picture
            ON ReviewPicture.picture_fk = Picture.picture_id
            WHERE review_id = ${id};`;
        review.review = db.execute(reviewSQL)[0];
        let commentsSQL = `SELECT c.comment_id AS 'commentId', c.author_fk AS 'authorId', author.full_name AS 'author', c.message,
            c.thumbs_up AS 'thumbsUp', c.thumbs_down AS 'thumbsDown', c.time_created AS 'timeCreated',
            parentAuthor.full_name AS 'parentAuthor', parent.message AS 'parentMessage'
            FROM Comment c
            JOIN RegisteredUser author
            ON c.author_fk = author.reg_user_id
            JOIN Comment parent
            ON c.reply_fk = parent.comment_id
            JOIN RegisteredUser parentAuthor
            ON parent.author_fk = parentAuthor.reg_user_id
            JOIN ReviewComment
            ON c.comment_id = ReviewComment.comment_fk
            WHERE ReviewComment.review_fk = ${id};`;
        review.comments = db.execute(commentsSQL)[0];
        return review;
    }

    static getBadReview() {
        let sql = `SELECT review_fk AS 'reviewId', author.reg_user_id AS 'renterId', author.full_name AS 'renter',
            landlord.reg_user_id AS 'landlordId', landlord.full_name AS 'landlord',
            rating, title, description, Review.time_created AS 'timeCreated',
            landlord_picture.file_name AS 'thumbnail', author_picture.file_name AS 'profile'
            FROM LandlordReview
            JOIN Review
            ON LandlordReview.review_fk = Review.review_id
            JOIN RegisteredUser author
            ON Review.author_fk = author.reg_user_id
            JOIN RegisteredUser landlord
            ON LandlordReview.landlord_fk = landlord.reg_user_id
            LEFT JOIN Picture landlord_picture
            ON landlord.profile_picture_fk = landlord_picture.picture_id
            LEFT JOIN Picture author_picture
            ON author.profile_picture_fk = author_picture.picture_id
            ORDER BY rating ASC
            LIMIT 1;`;
        return db.execute(sql);
    }
}

class Comment {

}

module.exports = { Review, Comment };