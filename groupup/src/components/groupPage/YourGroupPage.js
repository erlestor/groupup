import React, { useState, useEffect } from "react"
import "./group.css"
import { MdEdit } from "react-icons/md"
import { Link } from "react-router-dom"
import axios from "../../axios"
import MatchList from "./MatchList"
import GroupList from "./GroupList"

import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import BasicTabs from "./BasicTabs"
import Group from "./Group"
import ReviewsBox from "./ReviewsBox"

const YourGroupPage = ({ user, group, setGroup }) => {
  const [superlikes, setSuperlikes] = useState([])
  const [pendingReviewGroups, setPendingReviewGroups] = useState([])
  const [reviews, setReviews] = useState([])

  const {
    name,
    description,
    members,
    interests,
    location,
    image,
    adminEmail,
    goldMembership,
    ageSpan,
    superLikedBy,
    pendingReviews,
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

  const getReviewGroups = async () => {
    await axios
      .post("/getGroupsByIds", { idList: pendingReviews })
      .then((response) => {
        setPendingReviewGroups(response.data)
        console.log(response.data)
      })
      .catch((err) => console.error(err))
  }

  const getReviews = async () => {
    await axios
      .post("/getReviewsByReviewedID", { reviewedID: group.id })
      .then((response) => {
        setReviews(response.data)
        console.log(response.data)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    getSuperlikes()
    getReviewGroups()
    getReviews()
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
        <div className="boxes-container">
          <div className="left-container">
            <div className="info-container">
              <span className="bold">Members:</span> {members.join(", ")}
            </div>
            <div className="info-container">
              <span className="bold">Interests:</span> {interests.join(", ")}
            </div>
            <div className="info-container description-container">
              <span className="bold">Description:</span> {description}
            </div>
          </div>
          <ReviewsBox reviews={reviews} />
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
      </div>
      <BasicTabs
        item1={
          <div>
            <MatchList group={group} />
          </div>
        }
        item2={
          <div>
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
        }
        item3={
          <div>
            {group && pendingReviewGroups && pendingReviewGroups.length > 0 ? (
              <div className="flex-center">
                {pendingReviewGroups.map((group, groupIdx) => (
                  <Link
                    to={`/review/${group._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Group
                      name={group.name}
                      id={group._id}
                      description={group.description}
                      members={group.members}
                      interests={group.interests}
                      location={group.location}
                      meetingDate={group.date}
                      image={group.image}
                      ageSpan={group.ageSpan}
                      adminEmail={group.adminEmail}
                      goldMembership={group.goldMembership}
                      phonenumber={group.phonenumber}
                      superLikedBy={group.superLikedBy}
                      pendingReviews={group.pendingReviews}
                      setGroup={setGroup}
                      key={groupIdx}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <h3>You have no pending reviews</h3>
            )}
          </div>
        }
      />
    </div>
  )
}

export default YourGroupPage
