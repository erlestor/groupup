import React, { useState, useEffect } from 'react'
import "./createGroup.css"
import ImageSelector from './ImageSelector';

import InterestCheckBox from './InterestCheckBox'

import axios from "../../axios"

/**
 * Gruppenavn
 * Interesser - tur, spill, sport, matlaging, quiz, ..
 * Beskrivelse
 * 
 * Dato for ønsket møte (denne settes på gruppesiden av admin)
 * 
 * Lokasjon for ønsket aktivitet (Spørsmål til studass. Er avstand i km et poeng?)
 *      Evt. bare et streng-input, kan legge i backloggen å legge til Google Maps API e.l.
 *      Bilde for ønsket aktivitet, kanskje bare hente første treff på google bilder med søkeord fra interests?
 */

const CreateGroup = () => {

    // user will be a prop
    const user = {email:"1@2.com"}

    const interests = ["Quiz", "Brettspill", "Trav", "Tur", "Matlaging", "Sport", "Dataspill", "Klatring", "Frisbeegolf"];
    const fylker = ["Oslo", "Rogaland", "Møre og Romsdal", "Nordland", "Viken", "Innlandet", "Vestfold og Telemark", "Agder", "Vestland", "Trøndelag", "Troms og Finnmark"]

    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [error, setError] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [selectedInterests, setSelectedInterests] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) createGroup()
    }

    const createGroup = async () => {
       await axios.post("/createGroup", {
           name: groupName,
           description: groupDescription,
           interests: selectedInterests,
           date: "",
           location: location,
            adminEmail: user.email,
            members: [user.email],
            image: image
       }).then((response) => {
           console.log(response)
       }).catch((err) => {
           console.error(err)
           setError("Internal server error.")
       })
    }

    const validateForm = () => {
        console.log(selectedInterests)
        if (groupName === "") {
            setError("Fyll inn gruppenavn.")
            return false
        }
        if (groupDescription === "") {
            setError("Skriv en gruppebeskrivelse.")
            return false;
        }
        if (selectedInterests.length < 1) {
            setError("Velg minst én interesse.")
            return false
        }
        if (location === "") {
            setError("Velg en lokasjon.")
            return false;
        }
        if (image === null) {
            setError("Velg et bilde.")
            return false;
        }



        setError("")

        return true;
    }

    return (
    <div className="container">
        <div className="form-container">
            <h2 style={{textAlign: "center"}}>Lag ny gruppe</h2>
            <form>
                <input
                 required
                 className="group-input"
                 placeholder="Gruppenavn"
                 onChange={(e) => setGroupName(e.target.value)}
                />
                <textarea
                 required
                 className="group-input"
                 placeholder="Beskrivelse av din gruppe"
                 onChange={(e) => setGroupDescription(e.target.value)}
                />
                <div className="interest-container">
                    {interests.map((interest) => {
                        return <InterestCheckBox
                         title={interest}
                         callback={(checked) => {
                            if (checked) {
                                const newInterests = selectedInterests
                                newInterests.push(interest)
                                setSelectedInterests(newInterests)
                            } else {
                                const newInterests = selectedInterests.filter(i => i !== interest);
                                setSelectedInterests(newInterests)
                            }
                        }}
                        />;   
                    })}
                </div>
                Velg et gruppebilde
                    <select className="group-input select-fylke" onChange={ (e) => setLocation(e.target.value)} required>
                        <option disabled selected value="">Velg lokasjon</option>
                        {fylker.map((fylke) => {
                            return <option
                             value={fylke}
                             > {fylke}
                            </option>
                        })}
                    </select>
                <ImageSelector callback = {(img) => {
                    setImage(img)
                }}/>
                <button className="btn" onClick={(e) => handleSubmit(e)}>Lag gruppe</button>
            </form>
            <p className='error'>{error}</p>
        </div>
    </div>
  )
}

export default CreateGroup