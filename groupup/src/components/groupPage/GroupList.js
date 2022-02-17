import React from "react";
import Group from "./Group";
import "./group.css";
const GroupList = () => {
  const groups = [{id:"@id", name: "Venner på gløs", description: "Hei vi er venner på gløs", members: ["Espen", "Helle"], interests:["Ski", "Fotball"], location: "Trondheim", meetingDate: "23.04.22"},{name: "Gode venner på gløs", description: "Hei vi er gode venner på gløs", members: ["Espen2", "Helle2"], interests:["Ski", "Fotball"], location: "Trondheim", meetingDate: "23.04.22"}]

  const groupMap = groups.map((group) => (
    <Group
      name={group.name}
      description={group.description}
      members={group.members}
      interests={group.interests}
      location={group.location}
      meetingDate={group.meetingDate}

    />
  ));
  return <div className="group-list">
    <h2>All groups</h2>
    {groupMap}</div>;

};

export default GroupList;
