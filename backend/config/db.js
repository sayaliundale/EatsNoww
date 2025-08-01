const mongoose = require("mongoose");
require("dotenv").config();

const connect = async (req, res)=>{
    try{
        mongoose.connect(process.env.mongo_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("---MongoDB connection established");
    }
    catch(err){
        res.json({message : "Error occured"})
    }
}

module.exports = connect