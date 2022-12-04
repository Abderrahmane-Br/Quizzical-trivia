import React from "react";
import topBlob from "./images & assets/blob 5.svg";
import bottomBlob from "./images & assets/blob 2.svg";
import Quiz from "./components/Quiz";
import Button from "./components/Button";
import "./styles.css";
import { nanoid } from "nanoid";

export default function App() {
    const emptyAnswers = [
        { text: "", correct: null },
        { text: "", correct: null },
        { text: "", correct: null },
        { text: "", correct: null },
        { text: "", correct: null },
    ]
    const [phase, setPhase] = React.useState(1);
    const [quizes, setQuizes] = React.useState([]);
    const [rightAnswers, setRightAnswers] = React.useState(0);
    const [currentAnswer, setCurrentAnswer] = React.useState(emptyAnswers)
    const [shuffleValues, setShuffleValues] = React.useState(() => randomVals())
    console.log(rightAnswers)
    console.log(shuffleValues)
    let quizElements = quizes.map((quiz, index) => (
        <Quiz 
            key={nanoid()}
            index={index}
            question={quiz.question}
            correctAnswer={quiz.correct_answer}
            incorrectAnswers={quiz.incorrect_answers}
            phase={phase}
            countRightAnswers={setRightAnswers}
            shuffleValue={shuffleValues[index]}
            currentAnswer={currentAnswer[index]}
            setCurrentAnswer={setCurrentAnswer}
        />
    ))

    React.useEffect(() => {
        if(phase === 1) {
            setRightAnswers(0);
            setShuffleValues(randomVals())
            setCurrentAnswer(emptyAnswers)
            // fetch("https://opentdb.com/api.php?amount=5&type=boolean")
            fetch("https://opentdb.com/api.php?amount=5")
                .then(res => res.text())
                .then(data => {
                    setQuizes(JSON.parse(data).results)
                    })
                }
    }, [phase]);

    function handleBtnClick() {
        if(phase === 1) 
                setPhase(2);
        else if(phase === 2)
                setPhase(3);
             else
                setPhase(1)
    }

    function randomVals() {
        let vals = [];
        for (let i = 0; i < 4; i++)
            vals.push(Math.ceil(Math.random() * 4))
        return vals;
    }

    return (
        <main>
            <img src={topBlob} className="topRight-img"/>

                {phase === 1 && <>
                    <h2 className="title">Quizzical</h2>
                </>
                }

            {phase !== 1 && <>
                {quizElements}
                </>
            }

            <div className="footer">
                {phase === 3 &&
                    <span className="score">You scored {rightAnswers}/{quizElements.length} correct answers</span>
                }
                <Button
                    phase={phase}
                    click={handleBtnClick}
                />
            </div>
            <img src={bottomBlob} className="bottomLeft-img"/>
        </main>
    )
}