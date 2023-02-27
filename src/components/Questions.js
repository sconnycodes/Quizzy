import React, {useState, useEffect} from "react"
import { nanoid } from "nanoid"
import OneQuestion from "./OneQuestion"
import SingleQuestion from "./OneQuestion"

export default function Questions(){
    const [quizQuestions, setQuizQuestions] = useState([])
    

    //fetch quiz questions
    useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
      .then(res => res.json())
      .then(data => setQuizQuestions(data.results))
      }, [])
  
    function answerSelected(event){
        console.log(event)
    }
   
    // generate question elements  
    const questions = quizQuestions.map((e,i) => {
        return (
            <SingleQuestion 
            questions={e} 
            answerSelected={answerSelected} 
            key={nanoid()}
            />
        )
    })

  return (
    <div>
        {questions}
    </div>
        
    )
}