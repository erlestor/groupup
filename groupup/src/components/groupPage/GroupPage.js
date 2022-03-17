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
  const [image, setImage] = useState("")

  //Check if admin
  const isAdmin = user && user.email === adminEmail

  //Check if member
  const isMember = user && members.includes(user.email)

  useEffect(() => {
    //Get group from backend
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
          } else {
            console.error("no matching group")
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }

    getGroup()
  }, [matchGroupId])

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
  }

  //HTML
  return (
    <div className="group-page">
      <div className="header-container">
      {isAdmin && (
        <Link to={`/group/${matchGroupId}/edit`} className="router-link">
          <button className="edit-button">{<MdEdit size={20} />}</button>
        </Link>
      )}
      
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
      <div className="center">
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
        {/* <div>
          <span className="bold">When to meet:</span> {date}
        </div> */}
      </div>
      </div>
      {isMember || isAdmin ? (
        ""
      ) : (
        <button className="match-button" onClick={() => handleLike(false)}>
          Like
        </button>
      )}
      
    </div>
  )
}

export default GroupPage