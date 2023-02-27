import React from "react"
import {nanoid} from "nanoid"

export default function SingleQuestion(props){
    const answers = props.questions.incorrect_answers
    //some incorrect answer arrays returned from the API only contain incorrect answers wheras some include the correct answer, if the length is less than 4 then the below adds the correct answer to the array
    
    if(answers.length < 4){
        answers.push(props.questions.correct_answer)
        // next need to shuffle the array if this occurs
    }
             
    const answerElements = answers.map(answer => {
            
        return(
            <span dangerouslySetInnerHTML={{__html: answer}} className="answers" key={nanoid()} onClick={(event)=> props.answerSelected(event)} value={answer}></span>
            )
        })
        
    return( 
        <div>
            <h2 dangerouslySetInnerHTML={{__html: props.questions.question}} />
            {answerElements}
        </div>
    )
    
}