const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  noOfPages: {
    type: Number,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  abstract: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  uploadedImages: {
    type: Array,
    required: true,
  },
  userMail: {
    type: String,
    required: true,
  },
});

const bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;
