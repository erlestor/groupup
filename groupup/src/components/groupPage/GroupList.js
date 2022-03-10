import React, { useState, useEffect } from "react"
import Group from "./Group"
import "./group.css"

const GroupList = ({ groups, selectGroup, setGroup }) => {
  const groupMap = groups.map((group, groupIdx) => (
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
      selectGroup={selectGroup}
      setGroup={setGroup}
      key={groupIdx}
    />
  ))

  return <div className="group-list">{groupMap}</div>
}

export default GroupList
