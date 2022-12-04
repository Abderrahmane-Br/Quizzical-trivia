import React from "react";

export default function Answer(props) {
    const ans = props.value;
    const isChecked = ans === props.currentAnswer;
    let styles = { opacity: "50%" };

    if(props.isCorrect) 
        styles = {
            backgroundColor : "#94D7A2",
            borderColor: "transparent"
        }

    else if (isChecked) {
        styles = {
            ...styles,
            backgroundColor : "#F8BCBC",
        }
    }

    return (
        <>
            <input
                id={props.id}
                type="radio"
                name={`answer ${props.quizIndex}`}
                value={ans}
                checked={isChecked}
                onChange={(event) => props.toggle(event, props.isCorrect)}
            />
            <label
                className="answer"
                htmlFor={props.id}
                style={ props.phase === 3 ? styles : {} }
            >{ans}
            </label>
        </>
    )
}