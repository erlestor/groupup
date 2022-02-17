import mongoose from "mongoose"

const groupSchema = mongoose.Schema({
  name: String,
  interest: String,
  description: String,
  date: String,
  location: String,
  adminEmail: String,
  members: [String],
})

export default mongoose.model("groups", groupSchema)
