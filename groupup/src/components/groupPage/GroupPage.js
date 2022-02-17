import React, {useState, useEffect} from 'react'
import "./group.css"
import {MdEdit} from "react-icons/md"
import axios from "../../axios"

const GroupPage = ({id, user}) => {

    //Match handle

    //Check if admin
    const isAdmin = false
    //Check if member
    const isMember = false

    //Age span
    const thisYear = new Date().getFullYear()
    const [span, setSpan] = useState("");

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [members, setMembers] = useState([""])
    const [interests, setInterests] = useState([""])
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [usernames, setUsernames] = useState([""])

    //Get group from backend
    const getGroup = async () => {
      await axios.get("/groups").then((response) => {
        const groups = response.data
        console.log(groups)
        const matchingGroups = groups.filter(g => g._id === id)
        if (matchingGroups.length > 0) {
            const {name, description, members, interests, location, date} = matchingGroups[0]
            setName(name)
            setDescription(description)
            setMembers(members)
            setInterests(interests)
            setLocation(location)
            setDate(date)
        } else {
          console.error("no matching group")
        }
      }).catch((err) => {
        console.error(err)
      })
    } 

    const calcAgeSpan = async () => {
      if (members.length > 0) {
        await axios.get("/users").then((response) => {
          const users = response.data
          const usersInMembers = users.filter(user => members.includes(user.email))
          setUsernames(usersInMembers.map(user => user.name))
          const userAges = []
          usersInMembers.forEach(element => {
            userAges.push(parseInt(element.birthDate.split('-')[0]))
          });
          
          const span =  (thisYear - Math.max(...userAges))+" to "+(thisYear - Math.min(...userAges))
          setSpan(span)
        }).catch((err) => {
          console.error(err)
        })
      }
    }

    useEffect(() => {
      getGroup()
    }, [])

    useEffect(() => {
      calcAgeSpan()
    }, [members])
    


    //HTML 
  return (
    <div className='group-page'>
      {(isAdmin) && <button className='edit-button'>{<MdEdit size={20}/>}</button> }
      <h2 className='group-name-title'>{name}</h2>
        <img src={require("./friends.png")} />
        <div className='group-main-info'>
          <div><span className="bold">Members:</span>  {usernames.join(', ')}</div>
          <div><span className="bold">Interests:</span> {interests.join(', ')}</div>
          <div><span className="bold">Location:</span>  {location}</div>
          <div><span className="bold">Age span:</span>  {span}</div>
          <div><span className="bold">When to meet:</span>  {date}</div>
        </div>
        {(isMember || isAdmin) ? "" : <button className='match-button'>MATCH</button>}
        <div className='group-desc'>
          {description}
        </div>
    </div>
  )
}

export default GroupPage;