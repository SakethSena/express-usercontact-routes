const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name : {
        type : String,
        required : true 
    },
    phone : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
},{
     timestamps : true
}
);