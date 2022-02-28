import React, { useState, useEffect } from "react"

const InterestCheckBox = ({ title, callback, selectedInterests }) => {
  const [checked, setChecked] = useState(false)
  const backgroundColor = checked ? "#42A7E1" : "lightblue"

  useEffect(() => {
    setChecked(selectedInterests.includes(title))
  }, [selectedInterests, title])

  return (
    <div
      className="interest-box"
      style={{ background: backgroundColor }}
      onClick={() => {
        let bool = !checked
        setChecked(bool)
        callback(bool)
      }}
      id={`interest-${title}`}
    >
      {title}
    </div>
  )
}

export default InterestCheckBox
