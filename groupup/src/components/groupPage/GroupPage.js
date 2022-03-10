import React, { useState, useEffect } from "react"
import "./group.css"
import { MdEdit } from "react-icons/md"
import axios from "../../axios"
import { useParams, Link } from "react-router-dom"

const GroupPage = ({ user }) => {
  const { id } = useParams()

  //Age span
  const thisYear = new Date().getFullYear()
  const [span, setSpan] = useState("")

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [members, setMembers] = useState([""])
  const [interests, setInterests] = useState([""])
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [usernames, setUsernames] = useState([""])
  const [adminEmail, setAdminEmail] = useState([""])
  const [goldmembership, setGoldmembership] = useState(false)

  const [image, setImage] = useState("")
  //Check if admin
  const isAdmin = user && user.email === adminEmail

  //Check if member
  const isMember = user && members.includes(user.email)

  const calcAgeSpan = async () => {
    if (members.length > 0) {
      await axios
        .get("/users")
        .then((response) => {
          const users = response.data
          const usersInMembers = users.filter((user) =>
            members.includes(user.email)
          )
          setUsernames(usersInMembers.map((user) => user.name))
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
  }

  useEffect(() => {
    //Get group from backend
    const getGroup = async () => {
      await axios
        .get("/groups")
        .then((response) => {
          const groups = response.data
          console.log(groups)
          const matchingGroups = groups.filter((g) => g._id === id)
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
          } else {
            console.error("no matching group")
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }

    getGroup()
  }, [id])

  useEffect(() => {
    calcAgeSpan()

    // ikke fjern linjen under
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members])

  //HTML
  return (
    <div className="group-page">
      {isAdmin && (
        <Link to={`/group/${id}/edit`} className="router-link">
          <button className="edit-button">{<MdEdit size={20} />}</button>
        </Link>
      )}
      <h2 className="group-name-title">{name}</h2>
      <img src={image} alt="Gruppebilde" />
      <div className="group-main-info">
        <div>
          <span className="bold">Members:</span> {usernames.join(", ")}
        </div>
        <div>
          <span className="bold">Interests:</span> {interests.join(", ")}
        </div>
        <div>
          <span className="bold">Location:</span> {location}
        </div>
        <div>
          <span className="bold">Age span:</span> {span}
        </div>
        <div>
          <span className="bold">Membership: </span>
          {goldmembership ? "gold" : "normal"}
        </div>
        {/* <div>
          <span className="bold">When to meet:</span> {date}
        </div> */}
      </div>
      {isMember || isAdmin ? (
        ""
      ) : (
        <button className="match-button">MATCH</button>
      )}
      <div className="group-desc">{description}</div>
    </div>
  )
}

export default GroupPage
