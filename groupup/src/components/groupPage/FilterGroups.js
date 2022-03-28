import GroupList from "./GroupList"
import React, { useState, useEffect } from "react"
import axios from "../../axios"
import InterestCheckBox from "./InterestCheckBox"
import "./filterGroups.css"
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs"

import { allInterests, fylker } from "./groupAttributes"

//interesser, lokasjon, alder, gruppestørrelse og dato før ønsket møte
const FilterGroups = ({ group }) => {
  const [selectedInterests, setSelectedInterests] = useState([])
  const [location, setLocation] = useState("")
  const [ageMin, setAgeMin] = useState(18)
  const [ageMax, setAgeMax] = useState(100000000)
  const [groupCountMin, setGroupCountMin] = useState(1)
  const [groupCountMax, setGroupCountMax] = useState(1000000000)
  const [meetingDate, setMeetingDate] = useState("")
  const [dateInputType, setDateInputType] = useState("text")
  const [groups, setGroups] = useState([])
  const [filteredGroups, setFilteredGroups] = useState([])

  const [showFilters, setShowFilters] = useState(true)

  //Get group from backend
  const getGroups = async () => {
    await axios
      .get("/groups")
      .then((response) => {
        const groups = response.data
        setGroups(groups)
        setFilteredGroups(groups)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // on page load -> get groups from server
  useEffect(() => {
    getGroups()
  }, [])

  // when filters are changed, filter groups again
  useEffect(() => {
    let newFilteredGroups = groups

    newFilteredGroups =
      location !== ""
        ? newFilteredGroups.filter((g) => g.location === location)
        : newFilteredGroups
    newFilteredGroups =
      meetingDate !== ""
        ? newFilteredGroups.filter((g) => g.date === meetingDate)
        : newFilteredGroups
    newFilteredGroups = newFilteredGroups.filter(
      (g) => g.members.length >= groupCountMin
    )
    newFilteredGroups =
      groupCountMax !== ""
        ? newFilteredGroups.filter((g) => g.members.length <= groupCountMax)
        : newFilteredGroups
    newFilteredGroups =
      ageMin !== ""
        ? newFilteredGroups.filter((g) => parseInt(g.ageSpan[0]) >= ageMin)
        : newFilteredGroups
    newFilteredGroups =
      ageMax !== ""
        ? newFilteredGroups.filter((g) => parseInt(g.ageSpan[1]) <= ageMax)
        : newFilteredGroups
    newFilteredGroups = newFilteredGroups.filter((g) => group.id !== g._id)
    filterInterests(newFilteredGroups)
  }, [
    location,
    ageMin,
    ageMax,
    groupCountMin,
    groupCountMax,
    meetingDate,
    selectedInterests,
    groups,
  ])

  const filterInterests = (newFilteredGroups) => {
    newFilteredGroups =
      selectedInterests.length !== 0
        ? newFilteredGroups.filter(
            (g) =>
              selectedInterests.filter((x) => g.interests.includes(x)).length >
              0
          )
        : newFilteredGroups
    setFilteredGroups(newFilteredGroups)
  }

  //interesser, lokasjon, alder, gruppestørrelse og dato før ønsket møte
  return (
    <>
      {group ? (
        <div className="filter-page">
          <div className="filters">
            <div className="filter-headers"></div>
            <form className="filter-forms-container">
              <div className="interest-container">
                {allInterests.map((interest, i) => {
                  return (
                    <InterestCheckBox
                      key={i}
                      title={interest}
                      callback={(checked) => {
                        if (checked) {
                          setSelectedInterests([...selectedInterests, interest])
                        } else {
                          const newInterests = selectedInterests.filter(
                            (i) => i !== interest
                          )
                          setSelectedInterests(newInterests)
                        }
                      }}
                      selectedInterests={selectedInterests}
                    />
                  )
                })}
              </div>

              <select
                className="group-input select-fylke"
                onChange={(e) => setLocation(e.target.value)}
                style={{ margin: "10px" }}
                required
              >
                <option selected value="">
                  Pick location
                </option>
                {fylker.map((fylke, i) => {
                  return (
                    <option key={i} value={fylke}>
                      {" "}
                      {fylke}
                    </option>
                  )
                })}
              </select>
              <div className="filter-input-container">
                <input
                  className="ageMin-input"
                  type="number"
                  placeholder="Minimum age"
                  onChange={(e) => setAgeMin(e.target.value)}
                />

                <input
                  className="ageMax-input"
                  type="number"
                  placeholder="Maximum age"
                  onChange={(e) => setAgeMax(e.target.value)}
                />

                <input
                  className="groupCountMin-input"
                  type="number"
                  placeholder="Minimum group size"
                  onChange={(e) => setGroupCountMin(e.target.value)}
                />

                <input
                  className="groupCountMax-input"
                  type="number"
                  placeholder="Maximum group size"
                  onChange={(e) => setGroupCountMax(e.target.value)}
                />

                <input
                  type={dateInputType}
                  placeholder="Meetingdate"
                  onFocus={() => setDateInputType("date")}
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                />
              </div>
            </form>
          </div>
          <GroupList groups={filteredGroups} />
        </div>
      ) : (
        <h1>You need to select a group first</h1>
      )}
    </>
  )
}

export default FilterGroups
