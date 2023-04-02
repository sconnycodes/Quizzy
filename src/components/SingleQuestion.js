import React from "react"
import {nanoid} from "nanoid"

export default function SingleQuestion(props){
 
    function selected(event, questionNum){
        props.answerSelected(event.target.id, questionNum)
        console.log(props)
    }

    // build the answer components
    const answerElements = props.questions.possibleAnswers.map(answer => {   
        let isSelected = answer.isSelected 
        // endQuiz handles adding colour for correct/incorrect
        let endQuiz = ""
        if(props.endQuiz && isSelected){
            if(answer.isCorrect){
                endQuiz="correct"
            } else {
                endQuiz="incorrect"
            }
        }
        return(
            <span 
            dangerouslySetInnerHTML={{__html: answer.answer}}
            className={`answers ${isSelected && "isSelected"} ${endQuiz} ${(props.endQuiz && answer.isCorrect) && "correct"}`}
            key={nanoid()}
            onClick={(event) => selected(event, props.questions.questionNum)}
            id={answer.answer}>

            </span>
        )
    })
        
    return( 
        <div>
            <h2 dangerouslySetInnerHTML={{__html: props.questions.question}} />
            {answerElements}
        </div>
    )
    
}