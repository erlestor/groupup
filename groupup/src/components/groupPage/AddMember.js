import React, {useState} from 'react'
import { emailRegex } from '../login/RegisterRegex'
import "./createGroup.css"


const AddMember = () => {

    const [memberEmail, setMemberEmail] = useState("")
    const [error, setError] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            //POST member to group logic INN HER !!!!
        }
    }

    const validateForm = () => {
        if (!memberEmail.match(emailRegex)) {
            setError("Skriv inn en gyldig mailadresse.")
            return false
        }
        return true
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