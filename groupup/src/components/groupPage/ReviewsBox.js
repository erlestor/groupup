import React from "react"
import Rating from "./Rating"

const ReviewsBox = ({ reviews }) => {
  return (
    <div className="reviews-container">
      <h1>Reviews</h1>
      {reviews.map((review) => (
        <div className="review-small">
          <Rating defaultVal={review.points} />
          <p>{review.description}</p>
        </div>
      ))}
    </div>
  )
}

export default ReviewsBox
