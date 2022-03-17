import React, { useState, useEffect } from "react"
import "./group.css"
import { MdEdit } from "react-icons/md"
import axios from "../../axios"
import { useParams, Link } from "react-router-dom"

const GroupPage = ({ user, group }) => {
  const { matchGroupId } = useParams()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [members, setMembers] = useState([""])
  const [interests, setInterests] = useState([""])
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [adminEmail, setAdminEmail] = useState([""])
  const [goldmembership, setGoldmembership] = useState(false)
  const [ageSpan, setAgeSpan] = useState(false)
  const [likedBy, setLikedBy] = useState([])
  const [superLikedBy, setSuperLikedBy] = useState([])
  const [image, setImage] = useState("")

  useEffect(() => {
    getGroup()
  }, [])

  const getGroup = async () => {
    await axios
      .get("/groups")
      .then((response) => {
        const groups = response.data
        const matchingGroups = groups.filter((g) => g._id === matchGroupId)
        if (matchingGroups.length > 0) {
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
            ageSpan,
            likedBy,
            superLikedBy,
          } = matchingGroups[0]
          setName(name)
          setDescription(description)
          setMembers(members)
          setInterests(interests)
          setLocation(location)
          setDate(date)
          setImage(image)
          setAdminEmail(adminEmail)
          setGoldmembership(goldMembership)
          setAgeSpan(ageSpan)
          setLikedBy(likedBy)
          setSuperLikedBy(superLikedBy)
        } else {
          console.error("no matching group")
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleLike = async (superlike) => {
    await axios
      .put("/matchGroups", {
        groupIdToBeAdded: group.id,
        groupIdToAddTo: matchGroupId,
        superLike: superlike,
      })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => console.error(err))

    getGroup()
  }

  //HTML
  return (
    <div className="group-page">
      <div className="header-container">
        <img src={image} alt="Gruppebilde" />
        <h2 className="group-name-title">{name}</h2>
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
          {goldmembership ? "gold" : "normal"}
        </div>
      </div>
      <div className="flex">
        <button className="match-button" onClick={() => handleLike(false)}>
          {likedBy && likedBy.includes(group.id) ? "Liked" : "Like"}
        </button>
        {group.goldMembership ? (
          <button className="match-button" onClick={() => handleLike(true)}>
            {superLikedBy && superLikedBy.includes(group.id)
              ? "Superliked"
              : "Superlike"}
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default GroupPage
