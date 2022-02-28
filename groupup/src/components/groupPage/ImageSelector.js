import React from "react"
import "./createGroup.css"

import img1 from "../../Images/1.png"
import img2 from "../../Images/2.png"
import img3 from "../../Images/3.png"
import img4 from "../../Images/4.png"
import img5 from "../../Images/5.png"
import img6 from "../../Images/6.png"
import img7 from "../../Images/7.png"
import img8 from "../../Images/8.png"
import img9 from "../../Images/9.png"

const ImageSelector = ({ callback, currentImage, setCurrentImage }) => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9]
  const imageElements = []

  return (
    <div className="group-image-container">
      {images.map((img, i) => {
        const image = (
          <img
            style={img === currentImage ? { border: "2px solid #42A7E1" } : {}}
            src={img}
            alt={i}
            key={i}
            onClick={(e) => {
              setCurrentImage(img)
              callback(img)
            }}
          />
        )
        imageElements.push(image)
        return image
      })}
    </div>
  )
}

export default ImageSelector
