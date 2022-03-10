import GroupList from "./GroupList"
import React, { useState, useEffect } from "react"
import axios from "../../axios"
import { useNavigate } from "react-router-dom"
import "./filterGroups.css"

//interesser, lokasjon, alder, gruppestørrelse og dato før ønsket møte
const SelectGroup = ({ user, setGroup }) => {
  const [groups, setGroups] = useState([])

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

  // on page load -> get groups from server
  useEffect(() => {
    getGroups()
  }, [])

  const navigate = useNavigate()

  const handleCreateGroupClick = () => {
    navigate("/create-group")
  }

  const userGroups = groups.filter((group) =>
    group.members.includes(user.email)
  )

  //interesser, lokasjon, alder, gruppestørrelse og dato før ønsket møte
  return (
    <div className="select-group-page">
      <div className="select-group-header">
        <h2>Your groups</h2>
        <h3 className="select-group-description">
          Select a group to start matching with others
        </h3>
        <button
          onClick={handleCreateGroupClick}
          className="btn create-group-btn"
          id="create-group-btn"
        >
          Create new group
        </button>
      </div>
      <GroupList groups={userGroups} selectGroup={true} setGroup={setGroup} />
    </div>
  )
}

export default SelectGroup
