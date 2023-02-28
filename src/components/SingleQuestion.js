import React from "react"
import {nanoid} from "nanoid"

export default function SingleQuestion(props){
    const [renderAnswers, setRenderAnswers] = React.useState(props.questions.incorrect_answers)
    
    //some incorrect answer arrays returned from the API only contain incorrect answers whereas some include the correct answer, if the length is less than 4 then the below adds the correct answer to the array
    if(renderAnswers.length < 4){
        setRenderAnswers(prevState => [...prevState, props.questions.correct_answer])  
        
    }
    console.log(renderAnswers)
    // next need to randomise the renderAnswers array 
    React.useEffect(() => {
        setRenderAnswers(prevState => {
        const randomisedArray = prevState.map(answer => {
            return({
                answer: answer,
                isSelected: false,
                isCorrect: (answer == props.questions.correct_answer) 
            })
               
        })
        console.log(randomisedArray)
        for(let i = randomisedArray.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * i)
            let k = randomisedArray[i]
            randomisedArray[i] = randomisedArray[j]
            randomisedArray[j] = k
        }
        return randomisedArray
        })
    }, [])


    function selected(event){
        setRenderAnswers(prevState => {
            
            return prevState.map(answer => {
                if(answer.answer == event.target.id){
                    return {...answer, isSelected: !answer.isSelected}
                } else {
                    return answer
                }
            })
        })
        console.log(renderAnswers)
        props.answerSelected(event.target.id)
    }

    // build the answer components
    const answerElements = renderAnswers.map(answer => {       
        return(
            <span 
            dangerouslySetInnerHTML={{__html: answer.answer}}
            className="answers"
            key={nanoid()}
            onClick={(event) => selected(event)}
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