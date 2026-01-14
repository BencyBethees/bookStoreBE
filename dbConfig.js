// a file to configure database and node.js

//import mongooose
const mongooose = require("mongoose");

//mongoose connect using connectionString
mongooose
  .connect(
    //added the project name in btw /?
    // "mongodb+srv://bencybethees143_db_user:BencyEthan@cluster0.kprewkd.mongodb.net/Project0?appName=Cluster0"
    process.env.connectionString   
  )
  .then((res) => {
    console.log("connected to  mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
