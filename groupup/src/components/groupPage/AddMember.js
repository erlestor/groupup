import React, {useState} from 'react'
import "./createGroup.css"


const AddMember = () => {

    const [member, setMember] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

    }
  return (
   <div className='container'>
        <div className = "form-container" style={{backgroundColor: "white"}}>
            <form>
                <label>Legg til gruppemedlem: </label>
                <input className = "group-input add-member-input"
                placeholder = "Add Member"
                onChange={(e) => setMember(e.target.value)}
                
                />
                <button className='btn' onClick={(e) => handleSubmit(e)}>Lag gruppe </button>
            </form>
        </div>
   </div>
  )
}

export default AddMember