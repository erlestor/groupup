import mongoose from "mongoose"

const reviewSchema = mongoose.Schema({
  reviewedID: String,
  reviewerID: String,
  Descripiton: String,
  Points: {
      type: Number,
      min: 1,
      max: 5
  }
})

export default mongoose.model("reviews", reviewSchema)
