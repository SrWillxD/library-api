import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
});

const bookSchema = new mongoose.Schema({
    bookId: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
});


const InfoBooksReview = mongoose.model('libraryCL', bookSchema, 'libraryCL');

export default InfoBooksReview;
