import React, { useState } from 'react'

const InterestCheckBox = props => {
    const [checked, setChecked] = useState(false);

    let title = props.title;
    let callback = props.callback;

    let backgroundColor = checked ? "green" :  "red";

    return <div 
        style=
            {{"background": backgroundColor,
             "margin": "2px",
             "padding": "1px",
             "borderRadius": "4px"}} 
        onClick={()=>{
        let bool = !checked
        setChecked(bool);
        callback(bool);
        }}>
        {title}
    </div>
}

export default InterestCheckBox;
