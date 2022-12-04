import React from "react";
import Answer from "./Answer";
import { decode } from "html-entities";
import { nanoid } from "nanoid"

export default function Quiz(props) {

    let ans = decode(props.correctAnswer);
    const {currentAnswer, setCurrentAnswer} = props;
    const corrAns = <Answer
            key={nanoid()}
            id={ans +props.index}
            quizIndex={props.index}
            phase={props.phase}
            value={ans}
            currentAnswer={currentAnswer.text}
            isCorrect={true}
            toggle={handleChange}
        />
        
    const incAnswers = props.incorrectAnswers.map( (answer) => { 
        ans = decode(answer)
        return <Answer
                    key={nanoid()}
                    id={ans + props.index}
                    quizIndex={props.index}
                    phase={props.phase}
                    value={ans}
                    currentAnswer={currentAnswer.text}
                    isCorrect={false}
                    toggle={handleChange}
                />
})

        function shuffle(arr) {
            let rand = props.shuffleValue;
            for (let i=0; i < rand; i++)
                arr.push(arr.shift())
            return arr
        }

        function handleChange(event, isCorrect) {
            const { value } = event.target;

            setCurrentAnswer(prevAnswers => 
                prevAnswers.map(answer => 
                    answer === currentAnswer 
                    ?{text: value, correct: isCorrect}
                    :answer
                    ));
            props.countRightAnswers(prevCount => {
                if (isCorrect)
                    return prevCount +1;
                else if(prevCount>0 && currentAnswer.correct === true)
                    return prevCount -1

                return prevCount;
            })
        }
    return (
        <div className="quiz">
            <h3 className="quiz--question">
                {decode(props.question)}
            </h3>

            <div className="quiz--answers">
                {shuffle([corrAns, ...incAnswers])}
            </div>
        </div>
    )
}


// const corrAns = <Answer
//     correct={true}
//     value={decode(props.correctAnswer)}
//     phase={props.phase}
// />
// const answers = [corrAns, ...incAnswers];

// let incAnswers = props.incorrectAnswers.map((answer, ind) => (
//     <Answer
//         correct={false}
//         value={decode(answer)}
//         phase={props.phase}
//         chosen={false}
//         toggle={() => toggle(ind)}
//     />

// ))