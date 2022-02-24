import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Group from "./Group"
import "./group.css"
import axios from "../../axios"

const GroupList = () => {
  // const groups = [{name: "Venner på gløs", description: "Hei vi er venner på gløs", members: ["haavabru@stud.ntnu.no"], interests:["Ski", "Fotball"], location: "Trondheim", meetingDate: "23.04.22"},{name: "Gode venner på gløs", description: "Hei vi er gode venner på gløs", members: ["haavabru@stud.ntnu.no", "erlendstorsve@gmail.com"], interests:["Ski", "Fotball"], location: "Trondheim", meetingDate: "23.04.22"}]
  const [groups, setGroups] = useState([])
  const navigate = useNavigate()
  //Get group from backend
  const getGroups = async () => {
    await axios
      .get("/groups")
      .then((response) => {
        const groups = response.data
        setGroups(groups)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    getGroups()
  }, [])

  const handleClick = () => {
    navigate("/create-group")
  }

  const groupMap = groups.map((group, groupIdx) => (
    <Group
      name={group.name}
      id={group._id}
      description={group.description}
      members={group.members}
      interests={group.interests}
      location={group.location}
      meetingDate={group.meetingDate}
      image={group.image}
      key={groupIdx}
    />
  ))
  return (
    <div className="group-list">
      <button onClick={handleClick} className="btn" id="create-group-btn">
        Create new group
      </button>
      <h2>All groups</h2>
      {groupMap}
    </div>
  )
}

export default GroupList
