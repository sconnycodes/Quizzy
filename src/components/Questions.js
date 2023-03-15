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
                setQuizQuestions(() => {
                    const newState = data.results.map((question, index) => {
                        const answers = question.incorrect_answers.map(q => {
                            return {answer: q, isSelected: false}
                        })
                        //some incorrect answer arrays returned from the API only contain incorrect answers whereas some include the correct answer, if the length is less than 4 then the below adds the correct answer to the array
                        if(answers.length < 4){
                            answers.push({answer: question.correct_answer, isSelected: false})
                        }
                        // next need to randomise the answers array 
                        for(let i = 3; i > 0; i--){
                            let j = Math.floor(Math.random() * i)
                            let k = answers[i]
                            answers[i] = answers[j]
                            answers[j] = k
                        }
                        
                        return {
                            ...question,
                            possibleAnswers: answers,
                            questionNum: (index + 1)
                        } 
                        })
                        
                        return newState                     
                })  
            })
            .catch(console.error)
    }, [])
    
    function answerSelected(answer, questionNum){
        console.log(answer, questionNum)
        setQuizQuestions(prevState => {
            const newState = prevState.map(question => {
                console.log(question)
                if(questionNum == question.questionNum){
                    const newPossAnswers = question.possibleAnswers.map(a => {
                        if(answer === a.answer){
                            return {...a, isSelected: !a.isSelected}
                        } else {
                            return {...a, isSelected: false}
                        }
                    })
                    return {
                        ...question,
                        possibleAnswers: newPossAnswers
                    }
                } else {
                    return question
                }
            })
            console.log(newState)
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