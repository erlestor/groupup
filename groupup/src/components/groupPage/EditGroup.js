import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./editGroup.css"
import ImageSelector from "./ImageSelector"

import InterestCheckBox from "./InterestCheckBox"

import axios from "../../axios"

import { interests, fylker } from "./groupAttributes"
import AddMember from "./AddMember"

const EditGroup = ({ user }) => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [groupDescription, setGroupDescription] = useState("")
  const [location, setLocation] = useState("")
  const [image, setImage] = useState(null)
  const [selectedInterests, setSelectedInterests] = useState([])

  const { id } = useParams()

  useEffect(() => {
    //Get group from backend
    const getGroup = async () => {
      await axios
        .get("/groups")
        .then((response) => {
          const groups = response.data
          console.log(groups)
          const matchingGroups = groups.filter((g) => g._id === id)
          if (matchingGroups.length > 0) {
            const { name, description, interests, location, image } =
              matchingGroups[0]
            setGroupName(name)
            setGroupDescription(description)
            setSelectedInterests(interests)
            setLocation(location)
            setImage(image)
          } else {
            console.error("no matching group")
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }

    getGroup()
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) updateGroup()
  }

  const validateForm = () => {
    console.log(selectedInterests)
    if (groupName === "") {
      setSuccess(false)
      setError("Fyll inn gruppenavn.")
      return false
    }
    if (groupDescription === "") {
      setSuccess(false)
      setError("Skriv en gruppebeskrivelse.")
      return false
    }
    if (selectedInterests.length < 1) {
      setSuccess(false)
      setError("Velg minst én interesse.")
      return false
    }
    if (location === "") {
      setSuccess(false)
      setError("Velg en lokasjon.")
      return false
    }
    if (image === null) {
      setSuccess(false)
      setError("Velg et bilde.")
      return false
    }

    setError("")

    return true
  }

  const updateGroup = async () => {
    await axios
      .put("/editGroup", {
        _id: id,
        name: groupName,
        description: groupDescription,
        interests: selectedInterests,
        date: "",
        location: location,
        image: image,
      })
      .then((response) => {
        console.log(response)
        setSuccess(true)
        setError("endringer er lagret")
      })
      .catch((err) => {
        console.error(err)
        setSuccess(false)
        setError("Internal server error.")
      })
  }

  return (
    <div className="edit-group-page">
      <div className="form-container edit-form">
        <h2 style={{ textAlign: "center" }}>Endre på gruppe</h2>
        <form>
          <input
            required
            className="group-input"
            id="group-name"
            placeholder="Gruppenavn"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <textarea
            required
            className="group-input"
            id="group-description"
            placeholder="Beskrivelse av din gruppe"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
          />
          <div className="interest-container">
            {interests.map((interest, i) => {
              return (
                <InterestCheckBox
                  key={i}
                  title={interest}
                  callback={(checked) => {
                    if (checked) {
                      setSelectedInterests([...selectedInterests, interest])
                    } else {
                      setSelectedInterests(
                        selectedInterests.filter((i) => i !== interest)
                      )
                    }
                  }}
                  selectedInterests={selectedInterests}
                />
              )
            })}
          </div>
          <select
            className="group-input select-fylke"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option disabled selected value="">
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
          Velg et gruppebilde
          <ImageSelector
            callback={(img) => {
              setImage(img)
            }}
            currentImage={image}
            setCurrentImage={setImage}
          />
          <button
            className="btn"
            id="save-edit-group-btn"
            onClick={(e) => handleSubmit(e)}
          >
            Lagre
          </button>
        </form>
        <p className="error" style={{ color: success ? "green" : "red" }}>
          {error}
        </p>
      </div>
      <AddMember />
    </div>
  )
}

export default EditGroup
