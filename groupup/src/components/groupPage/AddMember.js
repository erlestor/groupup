import React, {useState} from 'react'
import "./createGroup.css"


const AddMember = () => {

    const [member, setMember] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

    }
  return (
   <div className='container'>
        <div className = "form-container">
            <form>
                <label>Legg til gruppemedlem: </label>
                <input className = "group-input add-member-input"
                placeholder = "Add member by email"
                onChange={(e) => setMember(e.target.value)}
                
                />
                <button className='btn form-btn' onClick={(e) => handleSubmit(e)}>Legg til medlem i gruppe </button>
            </form>
        </div>
   </div>
  )
}

export default AddMember