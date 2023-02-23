import './App.css';
import React, {useState, useEffect} from "react"
import Start from "./components/Start"
import Questions from "./components/Questions"
export default function App() {
  const [quizStarted, setQuizStarted] = useState(false)

  function startQuiz(){
    setQuizStarted(status => !status)
  }

  

 
 
  return (
    <div id="mainContent">
      {!quizStarted && <Start startQuiz={startQuiz}/>}
      
      {quizStarted && <Questions />}
      
    </div>
    
  )
}


