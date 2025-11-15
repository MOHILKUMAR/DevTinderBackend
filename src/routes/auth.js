const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    //Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // console.log(req.body)
    // Creating a new indstance of the User model
    // const userObj = {
    //     firstName : "Virat",
    //     lastName  : "Kohil",
    //     emailId   : "mohil234@gmail.com",
    //     password  : "mohil@123"
    // }
    // const user = new User(userObj);

    // const user = new User({
    //     firstName : "Virat",
    //     lastName  : "Kohil",
    //     emailId   : "mohil234@gmail.com",
    //     password  : "mohil@123",
    //     // _id: "6"  do not play with it
    // });

    // const user = new User(req.body);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      // _id: "6"  do not play with it
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    //ADD the token to cookies and send the response back to the user
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User Add SuccessFully! ", data: savedUser });
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error(" Invaild Credentails ");
    }

    const isPasswordValid = await user.validatePassword(password); // bcrypt.compare  return boolean value.

    if (isPasswordValid) {
      // create  a JWT token
      //  const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790",
      //   {
      //     expiresIn: "7d", //tokens expires.
      //     // expiresIn: "1h",
      //     // expiresIn: "0d",

      //    });
      //  console.log(token);

      const token = await user.getJWT();

      //ADD the token to cookies and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invaild Credentails");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  // chaining  in express
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("login Successful");
});

module.exports = authRouter;
