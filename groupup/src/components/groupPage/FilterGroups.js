import GroupList from "./GroupList"
import React, { useState, useEffect } from "react"
import axios from "../../axios"
import InterestCheckBox from "./InterestCheckBox"

//interesser, lokasjon, alder, gruppestørrelse og dato før ønsket møte
const FilterGroups = () => {

    const[selectedInterests, setSelectedInterests] = useState([])
    const[location, setLocation] = useState("")
    const[ageMin, setAgeMin] = useState(18)
    const[ageMax, setAgeMax] = useState(100000000)
    const[groupCountMin, setGroupCountMin] = useState(1)
    const[groupCountMax, setGroupCountMax] = useState(1000000000)
    const[meetingDate, setMeetingDate] = useState("")
    const[dateInputType, setDateInputType] = useState("text")

    const allInterests = [
      "Quiz",
      "Brettspill",
      "Trav",
      "Tur",
      "Matlaging",
      "Sport",
      "Dataspill",
      "Klatring",
      "Frisbeegolf",
    ]
    
    const fylker = [
      "Oslo",
      "Rogaland",
      "Møre og Romsdal",
      "Nordland",
      "Viken",
      "Innlandet",
      "Vestfold og Telemark",
      "Agder",
      "Vestland",
      "Trøndelag",
      "Troms og Finnmark",
    ]

  // const groups = [{name: "Venner på gløs", description: "Hei vi er venner på gløs", members: ["haavabru@stud.ntnu.no"], interests:["Ski", "Fotball"], location: "Trondheim", meetingDate: "23.04.22"},{name: "Gode venner på gløs", description: "Hei vi er gode venner på gløs", members: ["haavabru@stud.ntnu.no", "erlendstorsve@gmail.com"], interests:["Ski", "Fotball"], location: "Trondheim", meetingDate: "23.04.22"}]
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

  useEffect(() => {
    getGroups()
  }, [])

  useEffect(() => {
    filteredGroups = ((selectedInterests.length !== 0) ? filteredGroups.filter(g => (selectedInterests.filter(x => g.interests.includes(x)).length > 0)) : filteredGroups)
  }, [selectedInterests])


  let filteredGroups = groups
  filteredGroups = ((location !== "") ? filteredGroups.filter(g => (g.location === location)) : filteredGroups)
  filteredGroups = ((meetingDate !== "") ? filteredGroups.filter(g => (g.date === meetingDate)) : filteredGroups)
  filteredGroups = (filteredGroups.filter(g => (g.members.length >= groupCountMin)))
  filteredGroups = ((groupCountMax !== "") ? filteredGroups.filter(g => (g.members.length <= groupCountMax)):filteredGroups)
  
//interesser, lokasjon, alder, gruppestørrelse og dato før ønsket møte 
    return(
        <div>

          <form>
            <h2>Apply to filter groups</h2>

            <div className="interest-container">
            {allInterests.map((interest, i) => {
              return (
                <InterestCheckBox
                  key={i}
                  title={interest}
                  
                  callback={(checked) => {
                    if (checked) {
                      const newInterests = selectedInterests
                      newInterests.push(interest)
                      setSelectedInterests(newInterests)
                    } else {
                      const newInterests = selectedInterests.filter(
                        (i) => i !== interest
                      )
                      setSelectedInterests(newInterests)
                    }
                   console.log(selectedInterests)
                  }}
                />
              )
            })}
            </div>

            <select
            className="group-input select-fylke"
            onChange={(e) => setLocation(e.target.value)}
            required
            >
            <option selected value="">
              Velg lokasjon
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


          </form> 
          <GroupList groups={filteredGroups} />
        </div>
    )
    
}


export default FilterGroups
