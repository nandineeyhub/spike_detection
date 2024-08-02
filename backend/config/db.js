const mongoose = require("mongoose")

const connectDB  = async () => {
    try{
      const connection = await mongoose.connect("mongodb://localhost:27017/spike-detection")
      console.log(`DB Connected`)
    } catch(error){
        console.log("DB connection failed due to Error: " + error)
    }
} 

module.exports = connectDB