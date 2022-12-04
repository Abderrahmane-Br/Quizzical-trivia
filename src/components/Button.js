import React from "react";

export default function Button(props) {
    let styles, text;
    switch (props.phase) {
        case 1: 
            styles = {
                padding: "16px 28px",
                fontSize: "16px"
            }
            text = "Start Quiz";
            break;
            case 2: 
            styles = {
                padding: "11px 22px",
                marginTop: "20px"
            }
            text = "Check answers";
            break;
            case 3: 
            styles = {
                padding: "8px 13px",
            }
            text = "Play again";
            break;

        default:
            break;
    }
    return (
        <button 
        style={styles} 
        onClick={props.click}
        >{text}</button>
    )
}