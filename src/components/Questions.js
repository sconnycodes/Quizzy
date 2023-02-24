import React, {useState, useEffect} from "react"

export default function Questions(){
    const [quizQuestions, setQuizQuestions] = useState([])
  
    useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
      .then(res => res.json())
      .then(data => setQuizQuestions(data.results))
      }, [])
  console.log(quizQuestions)
   const questions = quizQuestions.map(e => {
    const answers = e.incorrect_answers
    if(answers.length < 4){
        answers.push(e.correct_answer)
    }
    
    const answerElements = answers.map(answer => {
        return(
            <span dangerouslySetInnerHTML={{__html: answer}} id="answers"></span>
        )
    })
    console.log(answerElements)
      return( 
        <div>
        <h2 dangerouslySetInnerHTML={{__html: e.question}} />
        {answerElements}
        </div>
        

    )
  })

  return (
    <div>
        {questions}
    </div>
        
    )
}