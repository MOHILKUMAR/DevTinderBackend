
const mongoose = require("mongoose");

const connectDB = async () =>  {
    await mongoose.connect(
        "mongodb+srv://mohil4280_db_user:Va6ad69EEMLawjva@namastenode.sliak8u.mongodb.net/devTinder"
    );
};

module.exports = connectDB;
