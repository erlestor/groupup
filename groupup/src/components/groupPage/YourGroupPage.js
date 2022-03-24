import React, { useState, useEffect } from "react"
import "./group.css"
import { MdEdit } from "react-icons/md"
import { Link } from "react-router-dom"
import axios from "../../axios"
import MatchList from "./MatchList"
import GroupList from "./GroupList"

const YourGroupPage = ({ user, group, setGroup }) => {
  const [superlikes, setSuperlikes] = useState([])

  const {
    name,
    description,
    members,
    interests,
    location,
    image,
    adminEmail,
    goldMembership,
    id,
    ageSpan,
    superLikedBy,
  } = group

  //Check if admin
  const isAdmin = user && user.email === adminEmail

  const getSuperlikes = async () => {
    await axios
      .post("/getGroupsByIds", { idList: superLikedBy })
      .then((response) => {
        setSuperlikes(response.data)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    getSuperlikes()
  }, [])

  if (!group) {
    return <h1>You're not in a group</h1>
  }

  //HTML
  return (
    <div className="group-page">
      <div className="header-container">
        <img src={image} alt="Gruppebilde" />
        <h1 className="group-name-title">{name}</h1>
        {isAdmin && (
          <Link to={`/group/edit`} className="router-link">
            <MdEdit size={40} />
          </Link>
        )}
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
        <div>
          <h2 className="your-group-matches-header">Matches</h2>
          <div className="flex-center">
            <MatchList group={group} />
          </div>
        </div>
        <div>
          <h2 className="your-group-matches-header">Superlikes</h2>
          {superlikes && superlikes.length > 0 ? (
            <div className="flex-center">
              <GroupList
                groups={superlikes}
                selectGroup={false}
                setGroup={setGroup}
              />
            </div>
          ) : (
            <h3>You have no superlikes</h3>
          )}
        </div>
      </div>
    </div>
  )
}

export default YourGroupPage
