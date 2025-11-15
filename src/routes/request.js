const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { Connection } = require("mongoose");
const ConnectionRequest = require("../models/connectionReqest");
const User = require("../models/user");
const ConnectionRequestModel = require("../models/connectionReqest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status type" });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // if there is an existing  ConnectionRequest
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection is Already Exists !!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try{

      // take a params 
      // then check the status is valid or not 
      //apply findByOne 
      //then check the connectionRequest is null or not and send the response.
      //then change the status.
      //then save the data and return the response.

      const loggedInUser = req.user;
      const {status, requestId} = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if(!allowedStatus.includes(status)){
        return res.status(400).json({message : "status not allowed!"});
      }
    
      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId : loggedInUser._id,
        // toUserId : loggedInUser,
        status: "interested",
      })
       
      if(!connectionRequest){
        return res
         .status(404)
         .json({message: "connection request not found"});
      }

      connectionRequest.status = status;
      const data =  await connectionRequest.save();

      res.json({message: "Connection request " + status , data});

    }catch(err) {
      res.status(404).send("ERROR " + err.message);
    }
  }
);

module.exports = requestRouter;
