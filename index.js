require("dotenv").config(); //this configure the .env file to the application, the data inside the .env file will be accessible throughout the application via process global object  9
require("./dbConfig"); //9
const express = require("express"); //importing express  1
const cors = require("cors"); //cors  7
const router = require("./routes"); //importing router from routes.js  8

//server creation  2
const server = new express();

//middleware to allow resource sharing between different origins  8
server.use(cors());

//middleware to parse json , provided by express  4
server.use(express.json());

server.use("/uploads", express.static("./uploads"));

server.use(router);

// //sample request   5
// server.get("/getDetails", (req, res) => {
//   res.status(200).json({ message: "Req Received" });
// });

// //2-html ahnenl send   6
// server.get("/showHtml", (req, res) => {
//   res.status(200).send(' <h1 style="color: red">hellooooooooooo!!!!!</h1> ');
// });

//port creation  3
const port = 3000;

server.listen(port, () => {
  console.log("server is running in", port);
});
