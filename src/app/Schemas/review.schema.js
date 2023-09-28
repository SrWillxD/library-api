import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    name: String,
    grade: Number,
    review: String,
});

const bookSchema = new mongoose.Schema({
    bookId: Number,
    description: String,
    pages: Number,
    publisher: String,
    reviews: [reviewSchema],
});

const InfoBooksReview = mongoose.model('libraryCL', bookSchema, 'libraryCL');

export default InfoBooksReview;