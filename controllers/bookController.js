const bookModel = require("../models/bookModel");

exports.AddBookController = async (req, res) => {
  console.log(req.user);
  try {
    let {
      title,
      author,
      noOfPages,
      imgURL,
      price,
      discountPrice,
      abstract,
      publisher,
      language,
      ISBN,
      category,
    } = req.body;

    let imageArray = [];
    req.files.forEach((eachFile) => imageArray.push(eachFile.filename));

    let userMail = req.user; // usermail comes from token, we will decode the token in the middleware and update the request (add a new key named user and its value as email)

    if (
      title &&
      author &&
      noOfPages &&
      imgURL &&
      price &&
      abstract &&
      publisher &&
      language &&
      ISBN &&
      category &&
      // uploadedImages
      imageArray
    ) {
      //proceed to add data

      //to check if any book with same title is already added or not
      let existingBook = await bookModel.findOne({ title: title });

      if (existingBook) {
        //error
        res
          .status(409)
          .json({ message: "Book with this title is already added" });
      } else {
        //proceed to add data

        let newBook = new bookModel({
          title,
          author,
          noOfPages,
          imgURL,
          price,
          discountPrice,
          abstract,
          publisher,
          language,
          ISBN,
          category,
          uploadedImages: imageArray,
          userMail,
        });

        await newBook.save();
        res.status(201).json({ message: "successfully added", newBook });
      }
    } else {
      res.status(400).json({ message: " fields are not filled" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server" });
  }
};

exports.GetBookController = async (req, res) => {
  try {
    let searchKey = req.query.search;
    let query = {
      title: {
        $regex: searchKey,
        $options: "i",
      },
    };

    let bookData = await bookModel.find(query);
    res.status(200).json({ message: "successful", bookData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong in the serverside" });
  }
};

exports.GetLimitedBook = async (req, res) => {
  try {
    let limitedData = await bookModel.find().limit(6);
    res.status(200).json({ message: "book fetched successfully",limitedData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong in the serverside" });
  }
};

exports.GetSingleBook = async (req, res) => {
  try {
    let id = req.params.id;
    let singleBookData = await bookModel.findById({ _id: id });
    res.status(200).json(singleBookData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong in the serverside" });
  }
};
