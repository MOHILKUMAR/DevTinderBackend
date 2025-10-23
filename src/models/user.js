const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required : true,
        minLength: 3,
    },
    lastName : {
        type: String,
        required : true,
    },
    emailId : {
        type: String,
        lowercase : true,
        required : true,
        unique : true,
        trim: true
    },
    password: {
        type: String,
        required : true,
    },
    age : {
        type:Number,
        min: 18,
    },
    gender:{
        type:String,
         validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
         }

    },
    photoUrl : {
        type : String,
        default : "https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg"
        
    },
    about: {
        type : String,
        default : "hey I am using devTinder"
    },
    skills : {
        type : [String],
    }
},
{
     timestamps: true 
}
);



const User = mongoose.model("User", userSchema);
module.exports = User;