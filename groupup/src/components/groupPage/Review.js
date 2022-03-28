import React, { useState, useEffect } from "react"
import "./group.css"
import "./review.css"
import axios from "../../axios"
import Rating from "./Rating"
import { useParams, useNavigate } from "react-router-dom"

const Review = ({ group }) => {
  const [reviewText, setReviewText] = useState("")
  const [points, setPoints] = useState(2)

  const { id } = useParams()
  const navigate = useNavigate()
  const reviewedID = id

  const getGroup = async () => {
    await axios
      .get("/groups")
      .then((response) => {
        const groups = response.data
        const matchingGroups = groups.filter((g) => g._id === group.id)
        if (matchingGroups.length > 0) {
          group = matchingGroups[0]
        } else {
          console.error("no matching group")
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const endpoint =
      group.pendingReviews && group.pendingReviews.includes(reviewedID)
        ? "/createPendingReview"
        : "/createReview"

    await axios
      .post(endpoint, {
        reviewerID: group.id,
        reviewedID,
        description: reviewText,
        points: points,
      })
      .then((response) => navigate("/group"))
      .catch((err) => console.error(err))
  }

  return (
    <div className="review-container">
      <h1>Review</h1>
      <form className="review-form">
        <textarea
          className="group-input"
          placeholder="Write review here"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <Rating
          onChange={(event, newValue) => {
            setPoints(newValue)
          }}
        />
        <button
          className="match-button"
          id="create-group-btn"
          onClick={(e) => handleSubmit(e)}
        >
          Give feedback
        </button>
      </form>
    </div>
  )
}

export default Review
