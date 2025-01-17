const mongoose = require("mongoose");
mongoose.set("strictQuery", false)

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected`)
    } catch (err) {
        console.error(`Error : ${err.message}`);
        process.exit(1);
    }

}
module.exports = connectDB;
