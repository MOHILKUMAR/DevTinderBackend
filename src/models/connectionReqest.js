
const  mongoose = require("mongoose");
const { Schema } = require("./user");

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",  // reference to the user Collections
        required : true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true,
    },
    status: {
        type : String,
        enum: {
            values : ["ignored", "interested", "accepted", "rejected"],
            message : `{VALUE} is incorrect status type`
        }
    }
},
{
    timestamps : true,
})

//connectionRequest.find({fromuserId - 2343435454545454545 , toUserId - 2342344534634634646})
connectionRequestSchema.index({fromUserId : 1, toUserId : 1});

connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this;
    // check if the fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Connot send connection request to yourself!");
    }
    next();
}) 

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",
    connectionRequestSchema
)

module.exports = ConnectionRequestModel;