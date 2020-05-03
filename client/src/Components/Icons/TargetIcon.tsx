import React from "react";
import {animated, useTrail} from "react-spring"
import { IconSvg } from "./IconStyles";

const circlesPaths: Array<string> = [
  "M475,349.08a138.31,138.31,0,0,1,6.35,41.42c0,76.82-62.49,139.32-139.31,139.32S202.67,467.32,202.67,390.5,265.17,251.18,342,251.18A138.74,138.74,0,0,1,390.76,260l46.7-46.69A203.76,203.76,0,0,0,340,188.63c-113.08,0-205.07,92-205.07,205.07s92,205.07,205.07,205.07,205.07-92,205.07-205.07a203.59,203.59,0,0,0-22.18-92.5Z",
  "M342.33,325c-.78,0-1.56,0-2.34,0a68.3,68.3,0,1,0,2.34,0Z",
  "M591.14,232.88,573.9,250.13a272,272,0,0,1,40.88,143.68c0,150.93-122.79,273.72-273.72,273.72S67.34,544.74,67.34,393.81,190.13,120.09,341.06,120.09a272.13,272.13,0,0,1,146.81,42.8l15.19-15.18V95.81A338,338,0,0,0,340.12,54.15C152.58,54.15,0,206.73,0,394.27S152.58,734.39,340.12,734.39,680.24,581.82,680.24,394.27a337.82,337.82,0,0,0-40.86-161.39Z"
];

const TargetIcon: React.FC = () => { 
  const trails = useTrail(circlesPaths.length, {opacity: 1, from : {opacity: 0}})
  return (
    <IconSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 733.03 734.39">
      <defs></defs>
      <title>Asset 1</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">          
          {
            trails.map((props, index) => <animated.path style={props} className="cls-1" d={circlesPaths[index]} key={index}/>)
          }
          
          <polygon
            className="cls-1"
            points="365.62 329.91 533.08 166.51 546.49 109.79 653.78 0 640.69 92.34 733.03 79.25 632.69 182.5 570.88 198.5 404.03 365.65 365.62 329.91"
          />
        </g>
      </g>
    </IconSvg>
  );
};

export default TargetIcon;

