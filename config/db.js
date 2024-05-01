const mongoose = require("mongoose");

const connectDb = async () => {
    try{
      const connect = await mongoose.connect(process.env.CONNECTION_STRING);
      console.log("DB Server Connected");
    }
    catch (err) {
        console.log("Server Error");
    }
};

module.exports = connectDb;