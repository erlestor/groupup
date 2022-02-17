import React, {useState, useEffect} from "react";
import Group from "./Group";
import "./group.css";
import axios from "../../axios"

const GroupList = () => {
  // const groups = [{name: "Venner på gløs", description: "Hei vi er venner på gløs", members: ["haavabru@stud.ntnu.no"], interests:["Ski", "Fotball"], location: "Trondheim", meetingDate: "23.04.22"},{name: "Gode venner på gløs", description: "Hei vi er gode venner på gløs", members: ["haavabru@stud.ntnu.no", "erlendstorsve@gmail.com"], interests:["Ski", "Fotball"], location: "Trondheim", meetingDate: "23.04.22"}]
  const [groups, setGroups] = useState([])

  //Get group from backend
  const getGroups = async () => {
    await axios.get("/groups").then((response) => {
      const groups = response.data
        setGroups(groups)          
      }
    ).catch((err) => {
      console.error(err)
    })
  } 

  useEffect(() => {
    getGroups()
  }, [])
  

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
