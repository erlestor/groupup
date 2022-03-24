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
  ageSpan: [String],
  likedBy: [String],
  superLikedBy: [String],
  goldMembership: Boolean,
  phonenumber: Number,
})

export default mongoose.model("groups", groupSchema)
