import React, { useState } from "react"

const InterestCheckBox = (props) => {
  const [checked, setChecked] = useState(false)

  let title = props.title
  let callback = props.callback

  let backgroundColor = checked ? "#42A7E1" : "lightblue"

  return (
    <div
      style={{
        background: backgroundColor,
        margin: "2px",
        padding: "3px",
        borderRadius: "4px",
        userSelect: "none",
        color: "black",
      }}
      onClick={() => {
        let bool = !checked
        setChecked(bool)
        callback(bool)
      }}
    >
      {title}
    </div>
  )
}

export default InterestCheckBox
