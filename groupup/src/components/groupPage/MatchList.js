import React, { useState, useEffect } from "react"
import axios from "../../axios"
import GroupList from "./GroupList"

const MatchList = ({ group }) => {
  const [groupIDs, setGroupIDs] = useState([])
  const [groups, setGroups] = useState([])

  //Get group from backend
  const getMatchedGroupIDs = async () => {
    await axios
      .post("/getMatchesById", { groupId: group.id })
      .then((response) => {
        let groupIDList = []
        for (let match of response.data) {
          if (match.matcherID !== group.id) {
            groupIDList.push(match.matcherID)
          } else if (match.matchedID !== group.id) {
            groupIDList.push(match.matchedID)
          }
        }
        setGroupIDs(groupIDList)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const getMatchedGroups = async () => {
    await axios
      .post("/getGroupsByIds", {
        idList: groupIDs,
      })
      .then((response) => {
        const groups = response.data
        setGroups(groups)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    getMatchedGroupIDs()
  }, [])

  useEffect(() => {
    getMatchedGroups()
  }, [groupIDs])

  return (
    <>
      {groups.length > 0 ? (
        <div className="flex-center">
          <GroupList groups={groups} showPhonenumber={true} />
        </div>
      ) : (
        <h3>You have no matches</h3>
      )}
    </>
  )
}

export default MatchList
