import React, {useState, useEffect} from "react"
import { nanoid } from "nanoid"
import SingleQuestion from "./SingleQuestion"

export default function Questions(){
    const [quizQuestions, setQuizQuestions] = useState([])
    
    //fetch quiz questions
    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
            .then(res => res.json())
            .then(data => {
            //sets quizQuestions to an array of objects
                setQuizQuestions(data.results.map((question, index) => {
                    const answerArray = (question) => {
                        const answers = question.incorrect_answers.map(q => {
                            return {q, isSelected: false;}
                            
                        })
                        if(answers.length < 4){
                            answers.push(question.correct_answer)
                        }
                        // next need to randomise the answers array 
                        for(let i = 3; i > 0; i--){
                            let j = Math.floor(Math.random() * i)
                            let k = answers[i]
                            answers[i] = answers[j]
                            answers[j] = k
                        }
                        return answers
                    }

                    

                    return {
                        ...question,
                        possibleAnswers: answerArray,
                        questionNum: (index + 1)
                    }
                }))
                 
            })
            .catch(console.error)
    }, [])
    
    function answerSelected(event, questionNum){
        console.log(event)
        setQuizQuestions(prevState => {
            const newState = prevState.map(question => {
                if(questionNum == question.questionNum){
                    return {
                        ...question,
                        isSelected: !question.isSelected
                    }
                } else {
                    return question
                }
            })
            return newState
        })
        
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