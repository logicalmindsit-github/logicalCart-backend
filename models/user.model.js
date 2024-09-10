import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, index: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["User", "Admin"], default: "User", index: true } 
});

const Users = model("user", userSchema);

export default Users;
