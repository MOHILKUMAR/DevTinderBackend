const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
const jwt = require("jsonwebtoken");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const request = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", request);

connectDB()
  .then(() => {
    console.log("Database connection completed");
    // Start the server
    app.listen(7777, () => {
      console.log("Server is listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });

















































// // Get the user from database by the email
// app.get("/user" , async (req , res)=> {
 
//  const userEmail = req.body.emailId;
//  try{
//   // console.log(userEmail);
//    const user = await User.findOne({emailId : userEmail})
//     if(!user){
//       res.status(404).send("user not found");
//     }else{
//       res.send(user);
//     }

//     // const user = await User.find({emailId : userEmail})
//     // if(user.length === 0){
//     //   res.status(404).send("user not found")
//     // }else{
//     //   // res.send(users);
//     //   res.send(user);
//     // }

//  }catch(err){
//   res.status(400).send("Something went wrong");
//  }

// });

// //Feed API - GET /FEED - get all the users data from database
// app.get("/feed", async (req, res )=> {
//     try{
//       const users = await User.find({});
//       res.send(users);
//     }catch (err) {
//       res.status(400).send("Something went wrong")
//     }
// }) 

// //delete a user from the database;
// app.delete("/user", async(req, res)=> {
//   const userId = req.body.userId;
//   try{
//     // const user = await User.findByIdAndDelete({_id: userId});
//     const user = await User.findByIdAndDelete(userId);
//     res.send("User delete succcessfully")
//   }catch(err){
//     res.status(400).send("something went wrong");
//   }
// });


// // update the user data 
// app.patch("/user/:userId", async(req, res) => {

//   const userId = req.params?.userId;
//   const data = req.body;
//   // console.log(data);

//   try{

//   const ALLOWED_UPADTES = [
//     // "userId",
//     "skills", 
//     "photoUrl", 
//     "about",
//      "gender", 
//      "age"
//   ];

//   const isUpdateAllowed = Object.keys(data).every( k => ALLOWED_UPADTES.includes(k));

//   if(!isUpdateAllowed){
//     throw new Error("Update not allowed")
//   }
//   if(data?.skills.length > 10){
//     throw new Error("more than 10 skills are not allowed");
//   }
//     // await User.findByIdAndUpdate({_id: userId}, data);
//   const user =  await User.findByIdAndUpdate({_id: userId}, data , {
//     returnDocument : "after",
//     runValidators : true,
//   });
//   // console.log(user);
//     res.send("User updated successFully");
//   } catch(err) {
//     res.status(400).send("Update Failed " + err.message);
//   }
// })

















































// +++++++++++++++++++++ERROR HANDLE ++++++++++++++++++++++++
// app.get("/getUserData", (req, res) => {

//     try{
//     throw new Error("sflfj");
//     res.send("user data");
//     }
//     catch(err){
//     res.status(500).send("something went wrong");
//     }
// })

// wildcard to handle the error
// app.use("/", (err ,req, res, next ) => {
//     if(err) {
//         res.status(500).send("something went wrong");
//     }
// });

// ++++++++++++++Middlewares+++++++++++++++++++++++++++++++

// const { adminAuth , UserAuth } = require("./middlewares/auth");

// app.use("/admin", adminAuth);
// app.use("/user" , UserAuth);

// suppose there is the login api which we do not need to take the auth
// app.post("/user/loggin", (req,res) => {
//     res.send("User Data sent")
// } )

// we can also wirte like that it is safe
// app.get("/user/data", UserAuth,  (req, res) => {
//     res.send("user data");
// })

// app.use("/admin", (req, res, next) => {
//    console.log("Admin auth is getting checked");
//    const token = "xyz";
//    const isAdminAuthorized = token === "xy" // or "xyz";
//    if(!isAdminAuthorized){
//      res.status(401).send("Unauthorized");
//    }
//    else{
//     next()
//    }

// });
// app.get("/admin/getAllData", (req, res) => {
//     res.send("All data sent");
// });

// app.get("/admin/getAllData", (req, res) => {
//     const token  = "xydz";
//     const isAdminAuthorized = token ==="xyz";
//      if(isAdminAuthorized){
//           res.send("All Data sent");

//     }
//     else{
//         res.status(401).send("Unauthorized request");
//     }

// });

// app.get("/admin/deleteUser", (req, res) => {
//     res.send("Deleted a user");
// })

// what if i create the userApi which is not authorized by the admin middlewares.Is it protected or not
//Ans => No,

// app.get("/user", (req, res) => {
//     res.send("user data");
// })

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// app.use("/", (req, res) =>  {
//     res.send("Hello from the Dashboard");
// })
// app.use("/hello", (req, res) =>  {
//     res.send("Hello");
// })

// app.use("/test", (req, res) =>  {
//     res.send("Hello from the test");
// })

// app.listen(7777, ()=> {
//     console.log("Server is listening on port 7777")
// } );

// get call

// Handle the root route
// app.get("/", (req, res) =>  {
//     res.send("Hello from the Dashboard");
// });

// Handle the /hello route
// app.get("/hello", (req, res) =>  {
//     res.send("Hello");
// });

// // Handle the /test route
// app.get("/test", (req, res) =>  {
//     res.send("Hello from the test");
// });

// why you donot want to use the "use"
// app.use("/user", (req, res) =>{
//     res.send("hahahahahah")
// })

// app.get("/user", (req, res) => {
//     res.send({firstName: "Mohil" ,
//         lastName: "Kumar"
//     })
// })

// app.post("/user", (req , res) => {
//     res.send("Data is successfully saved to the database!");
// } )

// app.delete("/user", (req, res) => {
//     res.send("deleted successfully")
// })

// app.get("/ab?c", (req, res) => {
//     res.send({firstName: "Mohil" ,
//         lastName: "Kumar"
//     })
// })

// app.get("/ab+c", (req, res) => {
//     res.send({firstName: "Mohil" ,
//         lastName: "Kumar"
//     })
// })

// app.get("/ab*c", (req, res) => {
//     res.send({firstName: "Mohil" ,
//         lastName: "Kumar"
//     })
// })
// app.get("/a(bc)?d", (req, res) => {
//     res.send({firstName: "Mohil" ,
//         lastName: "Kumar"
//     })
// })

//regex

// app.get("/a/", (req, res) => {
//     res.send({firstName: "Mohil" ,
//         lastName: "Kumar"
//     })
// })

// app.get(/.*fly$/, (req, res) => {
//     res.send({firstName: "Mohil" ,
//         lastName: "Kumar"
//     })
// })

// req.query
// app.get("/user", (req, res) => {
//        console.log(req.query)
//     res.send({firstName: "Mohil" ,
//         lastName: "Kumar"
//     })
// })

//req.params

// app.get("/user/:userId/:name", (req, res) =>
//     {
//        console.log(req.params)
//     res.send({firstName: "Mohil" ,
//         lastName: "Kumar"
//     })
// })
