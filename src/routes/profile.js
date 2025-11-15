const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res )=> {
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

profileRouter.patch("/profile/edit", userAuth, async(req, res) => {

  try{
     if(!validateEditProfileData(req)){
      throw new Error("Invaild Edit Request");
     }
     const loggedInUser = req.user;
    //  console.log(loggedInUser);

     Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key])); 
    //  console.log(loggedInUser);
    await loggedInUser.save();
    //  res.send(`${loggedInUser.firstName}, your profile updated successfuly `);
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly `,
      data: loggedInUser,
    });

  }catch(err){
    res.status(400).send("Error : " + err.message);
  }

})

module.exports = profileRouter;

