import React from "react";
import "./button.css";

// eslint-disable-next-line import/no-anonymous-default-export
export default props => 
    <button className={`
        button
        ${props.operation ? "operation" : ""}
        ${props.triple ? "triple" : ""}
        ${props.double ? "double" : ""}  
    `}
    onClick={e=> props.click && props.click(props.label)}>
        {props.label}
    </button>
