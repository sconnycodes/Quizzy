import './App.css';
import React, {useState, useEffect} from "react"
import Start from "./components/Start"
export default function App() {
  const [quizStarted, setQuizStarted] = useState(false)

  function startQuiz(){
    setQuizStarted(status => !status)
  }

  const [quizQuestions, setQuizQuestions] = useState([])
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
      .then(res => res.json())
      .then(data => setQuizQuestions(data.results))
    
      
  }, [])

  const questions = quizQuestions.map(e => {
    return( <h2>{e.question}</h2>)
  })
 
  return (
    <div id="mainContent">
      {/* <Start startQuiz={startQuiz}/> */}
      
      {/* {quizStarted && <h2>StartingQuizBby!</h2>} */}
      {questions}
    </div>
    
  )
}


