import React, {useState, useEffect} from "react"

export default function Questions(){
    const [quizQuestions, setQuizQuestions] = useState([])
  
    useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
      .then(res => res.json())
      .then(data => setQuizQuestions(data.results))
      }, [])
  
   const questions = quizQuestions.map(e => {
    console.log(e)
    return( 
        <>
        <h2 dangerouslySetInnerHTML={{__html: e.question}} />

        </>
        

    )
  })

  return (
    <div>
        {questions}
    </div>
        
    )
}