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
                            return {answer: q, isSelected: false, isCorrect: false, isMarked: false, }
                        })
                        // add correct answer to answers array
                        if(answers.length < 4){
                            answers.push({answer: question.correct_answer, isSelected: false, isCorrect: true, isMarked: false,})
                        }
                        // next need to randomise the answers array
                        // ***This needs reviewed as correct answer never seems to end up as the fourth option post shuffle*** 
                        for(let i = answers.length - 1; i > 0; i--){
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
    
    // handle if answer is selected and highlight
    // if another answer is already selected for question then toggle isSelected to false, otherwise toggle to the opposite of the existing state
    function answerSelected(answer, questionNum){
        console.log(answer, questionNum)
        setQuizQuestions(prevState => {
            const newState = prevState.map(question => {
                if(questionNum === question.questionNum){
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
        console.log("Hello")
        //first check all questions have been answered
        let numOfQuestionsAnswered = 0
        quizQuestions.forEach(question => {
            let isAnswered = false
            question.possibleAnswers.forEach(answer => {
                if(answer.isSelected === true){
                    isAnswered = true
                }
            })
            if(isAnswered){
                numOfQuestionsAnswered++
            }
        })
        if(numOfQuestionsAnswered < 5){
            console.log("Please select an answer for each question")
        } else {
            console.log("All 5 selected")
        }
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