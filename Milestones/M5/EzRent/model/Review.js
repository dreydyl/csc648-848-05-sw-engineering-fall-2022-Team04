/* Models for reviews and comments */

class Review {
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
}

class Comment {

}

module.exports = { Review, Comment };