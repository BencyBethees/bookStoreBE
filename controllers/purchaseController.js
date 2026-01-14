const purchaseModel = require("../models/purchaseModel");
const stripe = require("stripe")(process.env.stripeSecretKey);

exports.buyBook = async (req, res) => {
  try {
    let buyerMail = req.user;

    let {
      bookId,
      bookName,
      bookDesc,
      bookImage,
      sellerMail,
      price,
      discountPrice,
    } = req.body;

    let actualPrice = price - discountPrice;
    let line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: bookName,
            description: bookDesc,
            images: [bookImage],
            metadata: {
              title: bookName,
              sellerMail: sellerMail,
              bookId: bookId,
              price: price,
              discountPrice: discountPrice,
              buyerMail: buyerMail,
            },
          },

          unit_amount: Math.round(actualPrice * 100),
        },

        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/payment-failure",
    });
    let newPurchase = new purchaseModel({
      bookId,
      bookName,
      bookDesc,
      bookImage,
      sellerMail,
      price,
      discountPrice,
      buyerMail,
    });

    await newPurchase.save();

    res.status(200).json({"session" :   session });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong in the server side" });
  }
};
