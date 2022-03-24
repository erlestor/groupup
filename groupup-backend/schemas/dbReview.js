import mongoose from "mongoose"

const reviewSchema = mongoose.Schema({
  reviewedID: String,
  reviewerID: String,
  Descripiton: String,
  Points: {
      type: Number,
      min: 0,
      max: 5
  }
})

export default mongoose.model("users", userSchema)
