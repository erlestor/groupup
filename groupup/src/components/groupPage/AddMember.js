import React, {useState} from 'react'
import { emailRegex } from '../login/RegisterRegex'
import "./createGroup.css"
import axios from "../../axios"

const AddMember = () => {

    //Pass groupId to AddMember as a prop

    const groupId = {_id: "620e6400ea0d43a4032d7b09"}

    const [memberEmail, setMemberEmail] = useState("")
    const [error, setError] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) addMember()
    }

    const validateForm = () => {
        if (!memberEmail.match(emailRegex)) {
            setError("Skriv inn en gyldig mailadresse.")
            return false
        }
        return true
    }

    const addMember = async () => {
        await axios.put("/addUserToGroup", {
            userEmail: memberEmail,
            groupId: groupId
        }).then((response) => {
           console.log(response)
       }).catch((err) => {
            setError(err.response.data)
       })
    }

  return (
   <div className='container'>
        <div className = "form-container">
            <form>
                <label>Legg til gruppemedlem: </label>
                <input className = "group-input add-member-input"
                placeholder = "Add member by email"
                onChange={(e) => setMemberEmail(e.target.value)}
                
                />
                <button className='btn form-btn' onClick={(e) => handleSubmit(e)}>Legg til medlem i gruppe </button>
                <p className="error">{error}</p>
            </form>
        </div>
        
   </div>
  )
}

export default AddMember