import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB đã kết nối");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/bearstore`)

}

export default connectDB;