const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async (req, res, next) => {
  try {
    //Read the tokens from the req cookies
    //Validate the tokens
    //Find the user
    const { token } = req.cookies;
    if (!token) {
      throw new Error("TOKEN is not valid !!!");
      
    }
    const decodedObj = await jwt.verify(token, "DEV@Tinder$790");

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
     
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
};

module.exports = {
  userAuth,
};
