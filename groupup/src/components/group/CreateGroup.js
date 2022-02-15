import React, { useState } from 'react'
import "./group.css"

import InterestCheckBox from './InterestCheckBox'

/**
 * Gruppenavn
 * Interesser - tur, spill, sport, matlaging, quiz, ..
 * Beskrivelse
 * Bilde
 * 
 * Lokasjon (Spørsmål til studass. Er avstand i km et poeng?)
 * (Ønsket aktivitet + dato)
 */

const CreateGroup = () => {

    const interests = ["Quiz", "Brettspill", "Trav", "Tur", "Matlaging", "Sport", "Dataspill"];
    let interestboxes = [];

    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(interestboxes)
    }

  return (
    <div className="container">
        <div className="form-container">
            <h2>Lag ny gruppe</h2>
            <form>
                <input
                 className="group-input"
                 placeholder="Gruppenavn"
                 onChange={(e) => setGroupName(e.target.value)}
                />
                <textarea
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
                                interestboxes.push(interest)
                            } else {
                                let index = interestboxes.indexOf(interest);
                                interestboxes.splice(index, 1);
                            }
                        }}
                        />;   
                    })}
                </div>
                <button onClick={(e) => handleSubmit(e)}>Lag gruppe</button>
            </form>
        </div>
    </div>
  )
}

export default CreateGroup