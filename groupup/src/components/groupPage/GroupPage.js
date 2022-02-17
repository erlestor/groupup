import React from 'react'
import "./group.css"
import {MdEdit} from "react-icons/md"

const GroupPage = ({id, user}) => {

    //Get group from backend

    //Match handle

    //Check if admin
    const isAdmin = false
    //Check if member
    const isMember = false

    //Extract info from group
    const testGroup = ["Vennegjeng fra Gløs", "Hei! Vi er en superdupersuper hyggelig gruppe. Vil dere være med oss på en superduper kul kveld. Kan dere ta kontakt med oss. KAN DERE PLIS TA KONTAKT PLIS PLIS TEKST TESKT ", ["Helle", "Espen"], ["Football","Skiing","Football","Skiing","Football","Skiing","Football","Skiing","Football","Skiing"], "Trondheim", "23.04.22"]
    const name = testGroup[0]
    const description = testGroup[1]
    const members = testGroup[2]
    const interests = testGroup[3]
    const location = testGroup[4]
    const meetingDate = testGroup[5]
    const membersString = members.join(', ')
    const interestsString = interests.join(', ')

    //HTML 
  return (
    <div className='group-page'>
      {(isAdmin) && <button className='edit-button'>{<MdEdit size={20}/>}</button> }
      <h2 className='group-name-title'>{name}</h2>
        <img src={require("./friends.png")} />
        <div className='group-main-info'>
          <div><span className="bold">Members:</span>  {membersString}</div>
          <div><span className="bold">Interests:</span> {interestsString}</div>
          <div><span className="bold">Location:</span>  {location}</div>
          <div><span className="bold">When to meet:</span>  {meetingDate}</div>
        </div>
        {(isMember || isAdmin) ? "" : <button className='match-button'>MATCH</button>}
        <div className='group-desc'>
          {description}
        </div>
    </div>
  )
}

export default GroupPage;