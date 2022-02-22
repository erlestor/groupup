import mongoose from "mongoose"

const groupSchema = mongoose.Schema({
  name: String,
  interests: [String],
  description: String,
  date: String,
  location: String,
  adminEmail: String,
  members: [String],
  image: String,
})

export default mongoose.model("groups", groupSchema)
