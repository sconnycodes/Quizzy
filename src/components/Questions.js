import React, {useState, useEffect} from "react"
import { nanoid } from "nanoid"
import SingleQuestion from "./SingleQuestion"

export default function Questions(){
    const [quizQuestions, setQuizQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    //fetch quiz questions
    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
            .then(res => res.json())
            .then(data => {
            //sets quizQuestions to an array of objects
                setQuizQuestions(data.results)
                setAnswers(data.results.map(question => {
                    return question.correct_answer
                }))  
            })
            .catch(console.error)
    }, [])
    
    function answerSelected(event){
        console.log(quizQuestions)
        console.log(answers)
    }
    
    function checkAnswers(){

    }

    // generate question elements  
    const questions = quizQuestions.map((e) => {
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
        <button onClick={checkAnswers} id="checkAnswerBtn">Check answers</button>
    </div>
        
    )
}