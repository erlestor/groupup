import React, { useState } from "react"
import "./group.css"
import PropTypes from "prop-types"
import axios from "../../axios"
import { useNavigate } from "react-router-dom"

const Group = ({
  name,
  members,
  interests,
  location,
  image,
  meetingDate,
  id,
}) => {
  const navigate = useNavigate()

  const interestsString = interests.join(", ")
  const thisYear = new Date().getFullYear()
  const [span, setSpan] = useState()

  //Get birthdate of all users, return lowest - highest
  const calcAgeSpan = async () => {
    await axios
      .get("/users")
      .then((response) => {
        const users = response.data
        const usersInMembers = users.filter((user) =>
          members.includes(user.email)
        )
        const userAges = []
        usersInMembers.forEach((element) => {
          userAges.push(parseInt(element.birthDate.split("-")[0]))
        })
        const span =
          thisYear -
          Math.max(...userAges) +
          " to " +
          (thisYear - Math.min(...userAges))
        setSpan(span)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  calcAgeSpan()

  const handleClick = () => {
    navigate(`/group/${id}`)
  }

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
            <span className="bold">Age span:</span> {span}
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
