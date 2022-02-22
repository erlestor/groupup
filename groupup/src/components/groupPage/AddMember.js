import React, { useState } from "react"
import { emailRegex } from "../login/RegisterRegex"
import "./createGroup.css"
import axios from "../../axios"
import { useParams, useNavigate } from "react-router-dom"

const AddMember = () => {
  // group id
  const { id } = useParams()

  const [memberEmail, setMemberEmail] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

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
    await axios
      .put("/addUserToGroup", {
        userEmail: memberEmail,
        groupId: id,
      })
      .then((response) => {
        console.log(response)
        setError(`${memberEmail} was added to the group`)
      })
      .catch((err) => {
        setError(err.response.data)
      })
  }

  return (
    <div className="container">
      <div className="form-container">
        <form>
          <label>Legg til gruppemedlem: </label>
          <input
            className="group-input add-member-input"
            placeholder="Add member by email"
            onChange={(e) => setMemberEmail(e.target.value)}
          />
          <button className="btn form-btn" onClick={(e) => handleSubmit(e)}>
            Legg til medlem i gruppe
          </button>
          <button
            className="btn btn-grey"
            onClick={() => navigate(`/group/${id}`)}
          >
            Til gruppesiden
          </button>
          <p className="error">{error}</p>
        </form>
      </div>
    </div>
  )
}

export default AddMember
