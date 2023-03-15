import React from "react"
import {nanoid} from "nanoid"

export default function SingleQuestion(props){
 
    function selected(event, questionNum){
        props.answerSelected(event.target.id, questionNum)
    }

    // build the answer components
    const answerElements = props.questions.possibleAnswers.map(answer => {       
        return(
            <span 
            dangerouslySetInnerHTML={{__html: answer.answer}}
            className={`answers ${answer.isSelected && "isSelected"}`}
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