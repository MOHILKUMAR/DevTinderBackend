const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile", userAuth, async (req, res )=> {
  try{
//   const cookies = req.cookies;
//   const {token} = cookies;
//   if(!token){
//     throw new Error("Invaild token ")
//   }
//  //validation my token 
//  const decodedMessage = await jwt.verify(token, "DEV@TINDER#343")

// //  console.log(decodedMessage);
//  const {_id} = decodedMessage;
 
//  console.log(_id);
  const user  =  req.user;
//  console.log(user);
//  if(!user){
//   throw new Error("User dose not exists");
//  }
  // console.log(cookies)
res.send(user);
}catch(err){
   res.status(400).send("Error:" + err.message);
  }
})

module.exports = profileRouter;

