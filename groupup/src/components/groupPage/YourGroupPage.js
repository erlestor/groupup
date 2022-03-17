import React, { useState, useEffect } from "react"
import "./group.css"
import { MdEdit } from "react-icons/md"
import { useParams, Link } from "react-router-dom"

const YourGroupPage = ({ user, group }) => {
  if (!group) {
    return <h1>You're not in a group</h1>
  }

  const {
    name,
    description,
    members,
    interests,
    location,
    date,
    image,
    adminEmail,
    goldMembership,
    id,
    ageSpan,
  } = group

  //Check if admin
  const isAdmin = user && user.email === adminEmail

  //Check if member
  const isMember = user && members.includes(user.email)

  //HTML
  return (
    <div className="group-page">
      <div className="header-container">
        {isAdmin && (
          <Link to={`/group/${id}/edit`} className="router-link">
            <button className="edit-button">{<MdEdit size={20} />}</button>
          </Link>
        )}
        <img src={image} alt="Gruppebilde" />
        <h1 className="group-name-title">{name}</h1>
      </div>
      <div className="group-main-info">
        <div className="under-container">
          <div className="left-container">
            <div className="members-container">
              <span className="bold">Members:</span> {members.join(", ")}
            </div>
            <div className="interests-container">
              <span className="bold">Interests:</span> {interests.join(", ")}
            </div>
          </div>
          <div className="right-container">
            <div className="info-container">
              <span className="bold">Description:</span> {description}
            </div>
          </div>
        </div>
        <div>
          <span className="bold">Location:</span> {location}
        </div>
        <div>
          <span className="bold">Age span:</span>{" "}
          {ageSpan[0] + "-" + ageSpan[1]}
        </div>
        <div>
          <span className="bold">Membership: </span>
          {goldMembership ? "gold" : "normal"}
        </div>
        {/* <div>
          <span className="bold">When to meet:</span> {date}
        </div> */}
      </div>
    </div>
  )
}

export default YourGroupPage
