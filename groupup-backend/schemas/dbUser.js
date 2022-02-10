import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  email: String,
  birthDate: String,
})

export default mongoose.model("users", userSchema)
