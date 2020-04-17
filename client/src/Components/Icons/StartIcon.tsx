import React from "react"
import StartSvg from './svg/bow.svg'

const StartIcon : React.FC = () => {
    return (
        <img src={StartSvg} style={{height : "100%", width: "100%"}}/> 
    )
}

export default StartIcon;
