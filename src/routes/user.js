const express = require("express");
const ConnectionRequest = require("../models/connectionReqest");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const USER_SAFE_DATA = "firstName  lastName photoUrl gender age about skills";
const User = require("../models/user");

// Get all the connection to the loggedIn User
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  //first we need the get the loggedInUser id
  //find the connection request from the connectionRequestModel

  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName  lastName photoUrl gender age about skills"
    ); //string way
    // }).populate("fromUserId",  ["firstName" , "lastName"]) //array method
    // }).populate("fromUserId") it will send all the data which is called the over fetching the data.

    res.json({
      message: "Data fetched successful !",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(404).send("ERROR" + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    // Akshay => elon => accepted
    //Elon ==> Mark ==> accepted

    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ "Error": err.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    //User should see all the user card except
    //0. his own card
    //1. his connections
    //2. ignored people
    //3. already sent the connections request

    //  example  :  Rahul = [Akshay, Elon, mark , msdhoni ,.....]
    // R => Akshay, ==> rejected
    // Rahul = [ Elon, mark , msdhoni ,.....]
    // R => Elon, ===> Accepted
    // Rahul = [mark , msdhoni ,.....]

    //akshay = [elon, mark , dhoni , virat ] , except => {rahul}

    const loggedInUser = req.user;
    const page  = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;


    //find all the connections requests  (sent + received)
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id },
            { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId")
    // .populate("fromUserId" , "firstName").populate("toUserId" , "firstName")
     
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req)=> {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    // console.log(hideUsersFromFeed);

    const users = await User.find({
      $and : [
             { _id: { $nin: Array.from(hideUsersFromFeed)}},
             { _id: { $ne : loggedInUser._id } },

      ],
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);



    res.json({ data : users});
  } catch (err) {
    res.status(400).send({ "ERROR " : + err.message });
  }
});

module.exports = userRouter;
