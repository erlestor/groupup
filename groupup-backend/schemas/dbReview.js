import mongoose from "mongoose"

const reviewSchema = mongoose.Schema({
  reviewedID: String,
  reviewerID: String,
  description: String,
  points: {
    type: Number,
    min: 1,
    max: 5,
  },
})

export default mongoose.model("reviews", reviewSchema)
