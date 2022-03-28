import React, { useState, useEffect } from "react"
import "./group.css"
import { MdEdit } from "react-icons/md"
import axios from "../../axios"
import { useParams, Link } from "react-router-dom"
import ReviewsBox from "./ReviewsBox"

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
  const [phonenumber, setPhonenumber] = useState(null)

  const [matchedWith, setMatchedWith] = useState(false)

  const [reviews, setReviews] = useState([])

  useEffect(() => {
    getGroup()
    checkMatched()
    getReviews()
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
            phonenumber,
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
          setPhonenumber(phonenumber)
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
      .then((response) => {})
      .catch((err) => console.error(err))

    getGroup()
    checkMatched()
    getReviews()
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

  const checkMatched = async () => {
    await axios
      .post("/getMatchesById", {
        groupId: matchGroupId,
      })
      .then((response) => {
        console.log(response)
        response.data.forEach((match) => {
          if (match.matchedID === group.id || match.matcherID === group.id)
            setMatchedWith(true)
        })
      })
      .catch((err) => console.error(err))
  }
  // TODO
  // finn ut om de har matchet, isåfall vis: tlfnr, knapp for meeting finished

  //HTML
  return (
    <div className="group-page">
      <div className="header-container">
        <img src={image} alt="Gruppebilde" />
        <h2 className="group-name-title">{name}</h2>
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
        <span className="bold">Location:</span>
        {location}
        <div>
          <span className="bold">Age span:</span>{" "}
          {ageSpan[0] + "-" + ageSpan[1]}
        </div>
        <div>
          <span className="bold">Membership: </span>
          {goldmembership ? "gold" : "normal"}
        </div>
        {matchedWith && (
          <div>
            <span className="bold">Contact: </span>
            {phonenumber}
          </div>
        )}
      </div>
      {matchedWith ? (
        <Link to={`/review/${matchGroupId}`}>
          <button className="match-button">Conclude meeting</button>
        </Link>
      ) : (
        <div className="flex">
          <button className="match-button" onClick={() => handleLike(false)}>
            {(likedBy && likedBy.includes(group.id)) ||
            (superLikedBy && superLikedBy.includes(group.id))
              ? "Liked"
              : "Like"}
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
      )}
    </div>
  )
}

export default GroupPage
