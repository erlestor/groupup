import React, { useState } from "react"
import "./group.css"
import PropTypes from "prop-types"
import { useNavigate, useParams } from "react-router-dom"

const Group = ({
  name,
  members,
  interests,
  location,
  image,
  meetingDate,
  id,
  ageSpan,
  selectGroup,
  setGroup,
  adminEmail,
}) => {
  const navigate = useNavigate()

  const { userGroupId } = useParams()

  const handleClick = () => {
    if (selectGroup) {
      setGroup({
        name,
        members,
        interests,
        location,
        image,
        meetingDate,
        id,
        ageSpan,
        selectGroup,
        setGroup,
        adminEmail,
      })
      navigate(`/match`)
    } else navigate(`/group/${id}`)
  }

  const interestsString = interests.join(", ")

  return (
    <div className="group-container" onClick={handleClick}>
      <span>
        <img alt="Gruppebilde" src={image} />
        <h3 className="group-info">{name}</h3>
        {members !== [] ? (
          <div className="group-info">
            <span className="bold">Member count:</span> {members.length}
          </div>
        ) : (
          ""
        )}
        {members !== [] ? (
          <div className="group-info">
            <span className="bold">Age span: </span>
            {ageSpan[0] + "-" + ageSpan[1]}
          </div>
        ) : (
          ""
        )}
        {interests !== [] ? (
          <div className="group-info">
            <span className="bold">Interests:</span> {interestsString}
          </div>
        ) : (
          ""
        )}
        {location !== "" ? (
          <div className="group-info">
            <span className="bold">Location:</span> {location}
          </div>
        ) : (
          ""
        )}
        {meetingDate !== "" ? (
          <div className="group-info">
            <span className="bold">Meeting time:</span> {meetingDate}
          </div>
        ) : (
          ""
        )}
      </span>
    </div>
  )
}

Group.propTypes = {
  meetingDate: PropTypes.string,
  location: PropTypes.string,
  interests: PropTypes.array,
  members: PropTypes.array,
}

Group.defaultProps = {
  meetingDate: "",
  location: "",
  members: [],
  interests: [],
}

export default Group
