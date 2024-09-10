import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI  ;

const connect = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
};

export default connect;
