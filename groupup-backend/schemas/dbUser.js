import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    birthDate: Date,
})

export default mongoose.model("users", userSchema);