const { request } = require("express");
const userModel = require("../models/userModel"); //1
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  //2
  try {
    //3
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;

    if (userName && password && email) {
      //logic to register

      let existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        res
          .status(409)
          .json({ message: "user with this emailid is already registered" });
      } else {
        let newUser = new userModel({ userName, password, email });
        await newUser.save();
        res.status(201).json({ message: "Successfullt registered", newUser });
      }
    } else {
      res.status(400).json({ message: "please fill the fields" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server side" }); //4
  }
};

exports.loginUser = async (req, res) => {
  //1
  try {
    let { email } = req.body; //let email = req.body.email
    let { password } = req.body; //let password = req.body.password

    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      //login logic
      if (existingUser.password == password) {
        let payload = {
          userName: existingUser.userName,
          email: existingUser.email,
          userType: existingUser.userType,
        };

        let token = jwt.sign(payload, process.env.jwtSecretKey);
        res
          .status(200)
          .json({ message: "login successfull", token, existingUser });
      } else {
        res.status(400).json({ message: "invalid password" });
      }
    } else {
      res.status(400).json({ message: "user with this email id is not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error occured in the server" });
  }
};

exports.googleLogAPI = async (req, res) => {
  try {
    let { email, userName, proPic } = req.body;

    let existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      //login logic

      let payload = {
        userName: existingUser.userName,
        email: existingUser.email,
        userType: existingUser.Type,
      };

      let token = jwt.sign(payload, process.env.jwtSecretKey);
      res
        .status(200)
        .json({ message: "login successfull", token, existingUser });
    } else {
      //register logic
      let newUser = new userModel({
        userName,
        password: "googolePswd",
        email,
        proPic,
      });
      await newUser.save();

      let payload = {
        userName: newUser.userName,
        email: newUser.email,
        userType: newUser.userType,
      };

      let token = jwt.sign(payload, process.env.jwtSecretKey);
      res.status(200).json({ message: "login successfull", token });
    }
  } catch (error) {
    res.status(500).json({ message: "somethong went wrong inthe server side" });
  }
};
