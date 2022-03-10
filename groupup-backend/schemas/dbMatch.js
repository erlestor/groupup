import mongoose from "mongoose"

const matchSchema = mongoose.Schema({
    matcherID: String,
    matchedID: String
})

export default mongoose.model("matches", matchSchema)
