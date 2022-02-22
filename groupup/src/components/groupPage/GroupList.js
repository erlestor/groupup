import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Group from "./Group"
import "./group.css"

const GroupList = ({groups}) => {
  

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
      <h2>All groups</h2>
      {groupMap}
    </div>
  )
}

export default GroupList
