import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    age: Date,
})

export default mongoose.model("users", userSchema);