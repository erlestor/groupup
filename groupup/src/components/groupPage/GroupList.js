import React, { useState, useEffect } from "react"
import Group from "./Group"
import "./group.css"

const GroupList = ({
  groups,
  selectGroup,
  setGroup,
  showPhonenumber,
  reviewList,
}) => {
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
      goldMembership={group.goldMembership}
      phonenumber={group.phonenumber}
      superLikedBy={group.superLikedBy}
      pendingReviews={group.pendingReviews}
      selectGroup={selectGroup}
      setGroup={setGroup}
      key={groupIdx}
      showPhonenumber={showPhonenumber}
    />
  ))

  return <div className="group-list">{groupMap}</div>
}

export default GroupList
